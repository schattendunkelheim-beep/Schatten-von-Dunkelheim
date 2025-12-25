// ==================== GAME ENGINE ====================
// Enthält: Player, Combat, DialogManager, Game
// Benötigt: game-data.js muss vorher geladen sein

// ==================== PLAYER STATE ====================
const Player = {
    name: 'Wanderer',
    level: 1,
    xp: 0,
    xpToNext: 50,
    attributePoints: 0,
    
    // Base Stats (from level ups)
    baseStrength: 5,
    baseVitality: 5,
    baseIntelligence: 5,
    baseDexterity: 5,
    
    // Current Stats (base + equipment bonuses)
    strength: 5,      // Mehr Schaden
    vitality: 5,      // Mehr LP (1 Vit = 1 LP, Base 20)
    intelligence: 5,  // Mehr Mana (1 Int = 3 Mana)
    dexterity: 5,     // Geschwindigkeit/Wer zuerst angreift
    
    // Resources
    health: 1,        // Startet mit 1 LP (fast tot)
    maxHealth: 25,    // 5 Vit * 5 = 25
    mana: 15,
    maxMana: 15,      // 5 Int * 3 = 15
    stamina: 100,
    maxStamina: 100,
    
    // Combat stats (calculated from attributes + equipment)
    damage: 1,        // Base damage
    defense: 0,
    critChance: 0.05,
    critMultiplier: 1.5,
    
    // Equipment slots
    equipment: {
        weapon: null,
        shield: null,
        helmet: null,
        armor: null,
        pants: null,
        ring1: null,
        ring2: null,
        amulet: null
    },
    
    // Inventory (array of {itemId, quantity})
    inventory: [],
    inventorySize: 16,
    
    // Currency
    gold: 0,
    
    // Location
    currentScene: 'awakening',
    
    // Quests
    activeQuests: [],
    completedQuests: [],
    
    // Flags for game state
    flags: {},
    
    // Kill counters for quests
    killCounts: {},
    
    // Methods
    addItem(itemId, quantity = 1) {
        const itemData = GameData.items[itemId];
        if (!itemData) return false;
        
        if (itemData.stackable) {
            const existing = this.inventory.find(i => i.itemId === itemId);
            if (existing) {
                existing.quantity = Math.min(existing.quantity + quantity, itemData.maxStack || 99);
                Game.showNotification(`${itemData.name} x${quantity} erhalten!`);
                Game.updateInventoryUI();
                return true;
            }
        }
        
        if (this.inventory.length >= this.inventorySize) {
            Game.showNotification('Inventar voll!');
            return false;
        }
        
        this.inventory.push({ itemId, quantity });
        Game.showNotification(`${itemData.name}${quantity > 1 ? ' x' + quantity : ''} erhalten!`);
        Game.updateInventoryUI();
        return true;
    },
    
    removeItem(itemId, quantity = 1) {
        const index = this.inventory.findIndex(i => i.itemId === itemId);
        if (index === -1) return false;
        
        const slot = this.inventory[index];
        slot.quantity -= quantity;
        
        if (slot.quantity <= 0) {
            this.inventory.splice(index, 1);
        }
        Game.updateInventoryUI();
        return true;
    },
    
    hasItem(itemId, quantity = 1) {
        const slot = this.inventory.find(i => i.itemId === itemId);
        return slot && slot.quantity >= quantity;
    },
    
    useItem(itemId) {
        const itemData = GameData.items[itemId];
        if (!itemData || !this.hasItem(itemId)) return false;
        
        // Hide tooltip when item is used
        document.getElementById('item-tooltip').classList.remove('active');
        
        if (itemData.type === 'consumable') {
            if (itemData.healAmount) {
                const oldHealth = this.health;
                this.health = Math.min(this.health + itemData.healAmount, this.maxHealth);
                const healed = this.health - oldHealth;
                Game.showNotification(`+${healed} Leben`);
            }
            if (itemData.manaAmount) {
                this.mana = Math.min(this.mana + itemData.manaAmount, this.maxMana);
                Game.showNotification(`+${itemData.manaAmount} Mana`);
            }
            // Beer bonus
            if (itemData.isBeer) {
                Player.flags.beers_drunk = (Player.flags.beers_drunk || 0) + 1;
                if (Player.flags.beers_drunk % 5 === 0 && Player.flags.beers_drunk <= 20) {
                    Player.baseIntelligence += 1;
                    Player.recalculateStats();
                    Game.showNotification('Dauerhaft +1 Mana durch Bier-Toleranz!');
                    if (Player.flags.beers_drunk === 20) {
                        Player.health = Player.maxHealth;
                        Game.showNotification('Maximum erreicht! Volle LP als Bonus!');
                    }
                }
            }
            this.removeItem(itemId, 1);
            Game.updateUI();
            Game.updateInventoryUI();
            return true;
        }
        return false;
    },
    
    equipItem(itemId) {
        const itemData = GameData.items[itemId];
        if (!itemData || !itemData.slot) return false;
        
        const slot = itemData.slot;
        
        // Check if slot exists
        if (!(slot in this.equipment)) return false;
        
        // Check strength requirement
        if (itemData.requiredStr && this.strength < itemData.requiredStr) {
            Game.showNotification(`Benötigt ${itemData.requiredStr} Stärke! (Du hast ${this.strength})`);
            return false;
        }
        
        // Check dexterity requirement
        if (itemData.requiredDex && this.dexterity < itemData.requiredDex) {
            Game.showNotification(`Benötigt ${itemData.requiredDex} Geschick! (Du hast ${this.dexterity})`);
            return false;
        }
        
        // If equipping a two-handed weapon, unequip shield first
        if (itemData.two_handed && this.equipment.shield) {
            const shieldId = this.equipment.shield;
            this.equipment.shield = null;
            this.addItem(shieldId);
            Game.showNotification('Schild abgelegt (Bogen braucht beide Hände)');
        }
        
        // Unequip current item in that slot
        if (this.equipment[slot]) {
            this.addItem(this.equipment[slot]);
        }
        
        // Equip new item
        this.equipment[slot] = itemId;
        this.removeItem(itemId, 1);
        this.recalculateStats();
        Game.updateUI();
        Game.updateInventoryUI();
        Game.showNotification(`${itemData.name} ausgerüstet!`);
        return true;
    },
    
    unequipItem(slot) {
        if (!this.equipment[slot]) return false;
        
        const itemId = this.equipment[slot];
        if (this.inventory.length >= this.inventorySize) {
            Game.showNotification('Inventar voll!');
            return false;
        }
        
        this.equipment[slot] = null;
        this.addItem(itemId);
        this.recalculateStats();
        Game.updateUI();
        return true;
    },
    
    recalculateStats() {
        // Reset to base stats
        this.strength = this.baseStrength;
        this.vitality = this.baseVitality;
        this.intelligence = this.baseIntelligence;
        this.dexterity = this.baseDexterity;
        
        // Add equipment bonuses
        let bonusDamage = 0;
        let bonusDefense = 0;
        let hasBow = false;
        let hasTwoHanded = false;
        
        for (const slot in this.equipment) {
            const itemId = this.equipment[slot];
            if (itemId) {
                const item = GameData.items[itemId];
                if (item) {
                    if (item.strength) this.strength += item.strength;
                    if (item.vitality) this.vitality += item.vitality;
                    if (item.intelligence) this.intelligence += item.intelligence;
                    if (item.dexterity) this.dexterity += item.dexterity;
                    if (item.damage) bonusDamage += item.damage;
                    if (item.defense) bonusDefense += item.defense;
                    if (item.dexterity_scaling) hasBow = true;
                    if (item.two_handed) hasTwoHanded = true;
                }
            }
        }
        
        // If using two-handed weapon, disable shield bonus
        if (hasTwoHanded && this.equipment.shield) {
            const shieldItem = GameData.items[this.equipment.shield];
            if (shieldItem && shieldItem.defense) {
                bonusDefense -= shieldItem.defense;
            }
        }
        
        // Calculate derived stats
        const oldMaxHealth = this.maxHealth;
        this.maxHealth = 20 + this.vitality; // Base 20 + 1 per vitality
        this.maxMana = this.intelligence * 3;
        
        // Adjust current health if max changed
        if (this.health > this.maxHealth) this.health = this.maxHealth;
        if (this.mana > this.maxMana) this.mana = this.maxMana;
        
        // Damage calculation:
        // Bow: base 1 + dexterity bonus + weapon damage + training bonus
        // Normal: base 1 + strength bonus + weapon damage + training bonus
        const swordBonus = this.flags.sword_bonus || 0;
        const bowBonus = this.flags.bow_bonus || 0;
        
        if (hasBow) {
            this.damage = 1 + Math.floor(this.dexterity / 2) + bonusDamage + bowBonus;
        } else {
            this.damage = 1 + Math.floor(this.strength / 2) + bonusDamage + swordBonus;
        }
        
        // Defense from vitality + armor
        this.defense = Math.floor(this.vitality / 5) + bonusDefense;
    },
    
    gainXP(amount) {
        this.xp += amount;
        Game.showNotification(`+${amount} Erfahrung`);
        
        while (this.xp >= this.xpToNext) {
            this.levelUp();
        }
        Game.updateUI();
    },
    
    levelUp() {
        this.xp -= this.xpToNext;
        this.level++;
        
        // XP curve: each level needs more XP
        this.xpToNext = Math.floor(50 * Math.pow(1.5, this.level - 1));
        
        // Get attribute points to spend
        this.attributePoints += 3;
        
        // Full HP and Mana restore on level up
        this.health = this.maxHealth;
        this.mana = this.maxMana;
        
        this.recalculateStats();
        Game.showNotification(`Level Up! Stufe ${this.level}! +3 Attributpunkte - Volle LP & Mana!`);
        
        // Open character screen to spend points
        setTimeout(() => Game.openCharacter(), 500);
    },
    
    spendAttributePoint(attribute) {
        if (this.attributePoints <= 0) return false;
        
        switch(attribute) {
            case 'strength':
                this.baseStrength++;
                break;
            case 'vitality':
                this.baseVitality++;
                break;
            case 'intelligence':
                this.baseIntelligence++;
                break;
            case 'dexterity':
                this.baseDexterity++;
                break;
            default:
                return false;
        }
        
        this.attributePoints--;
        this.recalculateStats();
        
        // Restore some HP when putting points in vitality
        if (attribute === 'vitality') {
            this.health = Math.min(this.health + 5, this.maxHealth);
        }
        
        Game.updateUI();
        return true;
    },
    
    addGold(amount) {
        this.gold += amount;
        if (amount > 0) {
            Game.showNotification(`+${amount} Gold`);
        }
        Game.updateUI();
    },
    
    takeDamage(amount) {
        const actualDamage = Math.max(1, amount - this.defense);
        this.health = Math.max(0, this.health - actualDamage);
        Game.updateUI();
        return actualDamage;
    },
    
    heal(amount) {
        this.health = Math.min(this.maxHealth, this.health + amount);
        Game.updateUI();
    }
};

// ==================== COMBAT SYSTEM ====================
const Combat = {
    active: false,
    enemy: null,
    enemyId: null,
    enemyHealth: 0,
    enemyMaxHealth: 0,
    playerTurn: true,
    isDefending: false,
    currentEnemyObjectId: null, // Track which scene object this enemy is
    
    start(enemyId, sceneObjectId = null) {
        const enemyData = GameData.enemies[enemyId];
        if (!enemyData) return;
        
        this.active = true;
        this.enemyId = enemyId;
        this.enemy = { ...enemyData };
        this.enemyHealth = enemyData.health;
        this.enemyMaxHealth = enemyData.health;
        this.isDefending = false;
        this.currentEnemyObjectId = sceneObjectId;
        
        // Determine who goes first based on dexterity
        this.playerTurn = Player.dexterity >= (this.enemy.dexterity || 5);
        
        document.getElementById('combat-overlay').classList.add('active');
        document.getElementById('combat-enemy-name').textContent = this.enemy.name;
        
        // Enemy sprite display (images removed for optimization)
        const spriteEl = document.getElementById('enemy-sprite');
        spriteEl.textContent = this.enemy.icon;
        
        document.getElementById('combat-player-name').textContent = Player.name;
        document.getElementById('combat-log').innerHTML = '';
        
        this.log(`${this.enemy.name} erscheint!`, 'info');
        
        if (this.playerTurn) {
            this.log(`Du bist schneller und greifst zuerst an!`, 'info');
        } else {
            this.log(`${this.enemy.name} ist schneller!`, 'info');
            setTimeout(() => this.enemyTurn(), 1000);
        }
        
        this.updateCombatUI();
    },
    
    log(message, type = '') {
        const log = document.getElementById('combat-log');
        const entry = document.createElement('div');
        entry.className = `log-entry ${type ? 'log-' + type : ''}`;
        entry.textContent = message;
        log.appendChild(entry);
        log.scrollTop = log.scrollHeight;
    },
    
    updateCombatUI() {
        const playerHealthPercent = (Player.health / Player.maxHealth) * 100;
        const enemyHealthPercent = (this.enemyHealth / this.enemyMaxHealth) * 100;
        
        document.getElementById('combat-player-health').style.width = playerHealthPercent + '%';
        document.getElementById('combat-enemy-health').style.width = enemyHealthPercent + '%';
        
        const buttons = document.querySelectorAll('.combat-btn');
        buttons.forEach(btn => btn.disabled = !this.playerTurn);
    },
    
    attack() {
        if (!this.playerTurn) return;
        
        // Calculate damage
        let damage = Player.damage;
        let isCrit = Math.random() < Player.critChance;
        
        if (isCrit) {
            damage = Math.floor(damage * Player.critMultiplier);
            this.log(`Kritischer Treffer!`, 'damage');
        }
        
        // Apply enemy defense
        damage = Math.max(1, damage - this.enemy.defense);
        this.enemyHealth -= damage;
        
        this.log(`Du greifst an und verursachst ${damage} Schaden!`, 'damage');
        this.showDamageNumber(damage, isCrit, false);
        
        this.checkCombatEnd();
    },
    
    defend() {
        if (!this.playerTurn) return;
        
        this.isDefending = true;
        this.log('Du gehst in Verteidigungshaltung.', 'info');
        this.playerTurn = false;
        
        setTimeout(() => this.enemyTurn(), 1000);
    },
    
    useSkill() {
        if (!this.playerTurn) return;
        
        if (Player.mana < 10) {
            this.log('Nicht genug Mana!', 'info');
            return;
        }
        
        Player.mana -= 10;
        let damage = Math.floor(Player.damage * 1.5 + Player.intelligence / 2);
        damage = Math.max(1, damage - this.enemy.defense);
        this.enemyHealth -= damage;
        
        this.log(`Mächtiger Schlag! ${damage} Schaden!`, 'damage');
        this.showDamageNumber(damage, true, false);
        Game.updateUI();
        
        this.checkCombatEnd();
    },
    
    useItem() {
        if (!this.playerTurn) return;
        
        // Get all consumable items in inventory
        const consumables = Player.inventory.filter(invItem => {
            const itemData = GameData.items[invItem.itemId];
            return itemData && itemData.type === 'consumable';
        });
        
        if (consumables.length === 0) {
            this.log('Keine heilenden Items vorhanden!', 'info');
            return;
        }
        
        // Show item selection dialog
        this.showItemSelection(consumables);
    },
    
    showItemSelection(consumables) {
        // Create selection overlay
        let html = '<div id="combat-item-select" style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#1a1a2e;border:2px solid #8b0000;padding:20px;border-radius:10px;z-index:2000;min-width:250px;">';
        html += '<div style="color:#c9a227;font-size:18px;margin-bottom:15px;font-family:Cinzel,serif;">Item auswählen:</div>';
        
        consumables.forEach(invItem => {
            const itemData = GameData.items[invItem.itemId];
            let effectText = '';
            if (itemData.healAmount) effectText = `+${itemData.healAmount} LP`;
            if (itemData.manaAmount) effectText = `+${itemData.manaAmount} Mana`;
            
            html += `<div class="combat-item-option" onclick="Combat.useSelectedItem('${invItem.itemId}')" style="padding:10px;margin:5px 0;background:#2a2a3e;border:1px solid #4a4a5e;border-radius:5px;cursor:pointer;display:flex;justify-content:space-between;align-items:center;">
                <span style="color:#e0e0e0;">${itemData.icon} ${itemData.name} (${invItem.quantity}x)</span>
                <span style="color:#4ade80;">${effectText}</span>
            </div>`;
        });
        
        html += `<div onclick="Combat.closeItemSelection()" style="padding:10px;margin-top:10px;background:#4a1a1a;border:1px solid #8b0000;border-radius:5px;cursor:pointer;text-align:center;color:#e0e0e0;">Abbrechen</div>`;
        html += '</div>';
        html += '<div id="combat-item-backdrop" onclick="Combat.closeItemSelection()" style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.7);z-index:1999;"></div>';
        
        const container = document.createElement('div');
        container.id = 'combat-item-container';
        container.innerHTML = html;
        document.body.appendChild(container);
    },
    
    closeItemSelection() {
        const container = document.getElementById('combat-item-container');
        if (container) container.remove();
    },
    
    useSelectedItem(itemId) {
        this.closeItemSelection();
        
        const itemData = GameData.items[itemId];
        if (Player.useItem(itemId)) {
            this.log(`Du benutzt ${itemData.name}.`, 'heal');
            this.playerTurn = false;
            this.updateCombatUI();
            setTimeout(() => this.enemyTurn(), 1000);
        }
    },
    
    flee() {
        if (!this.playerTurn) return;
        
        // Flee chance based on dexterity comparison
        const fleeChance = 0.3 + (Player.dexterity - (this.enemy.dexterity || 5)) * 0.05;
        
        if (Math.random() < Math.max(0.1, Math.min(0.8, fleeChance))) {
            this.log('Du fliehst erfolgreich!', 'info');
            this.end(false, true);
        } else {
            this.log('Flucht fehlgeschlagen!', 'info');
            this.playerTurn = false;
            setTimeout(() => this.enemyTurn(), 1000);
        }
    },
    
    enemyTurn() {
        if (!this.active) return;
        
        let damage = this.enemy.damage;
        
        // Random variation
        damage = Math.floor(damage * (0.8 + Math.random() * 0.4));
        
        // Defense reduction
        if (this.isDefending) {
            damage = Math.floor(damage * 0.5);
            this.isDefending = false;
        }
        
        const actualDamage = Player.takeDamage(damage);
        this.log(`${this.enemy.name} greift an! ${actualDamage} Schaden!`, 'damage');
        this.showDamageNumber(actualDamage, false, true);
        
        if (Player.health <= 0) {
            this.log('Du wurdest besiegt...', 'damage');
            setTimeout(() => {
                this.end(false, false);
                Game.gameOver();
            }, 1500);
            return;
        }
        
        this.playerTurn = true;
        this.updateCombatUI();
    },
    
    checkCombatEnd() {
        this.updateCombatUI();
        
        if (this.enemyHealth <= 0) {
            this.log(`${this.enemy.name} wurde besiegt!`, 'info');
            
            // Mark enemy as dead in flags if it's a scene object
            if (this.currentEnemyObjectId) {
                Player.flags[this.currentEnemyObjectId + '_dead'] = true;
            }
            
            // Track kill count
            const enemyType = this.enemyId;
            Player.killCounts[enemyType] = (Player.killCounts[enemyType] || 0) + 1;
            
            // Rewards - only XP, no gold
            Player.gainXP(this.enemy.xp);
            
            // Loot with proper drop chances (hunt bonus for animals)
            this.log('--- Beute ---', 'info');
            let gotLoot = false;
            const huntBonus = this.enemy.isAnimal ? (Player.flags.hunt_bonus || 0) : 0;
            
            for (const loot of this.enemy.loot) {
                const adjustedChance = Math.min(1.0, loot.chance + huntBonus);
                if (Math.random() < adjustedChance) {
                    const qty = Math.floor(Math.random() * (loot.quantity[1] - loot.quantity[0] + 1)) + loot.quantity[0];
                    Player.addItem(loot.itemId, qty);
                    gotLoot = true;
                }
            }
            if (!gotLoot) {
                this.log('Keine besonderen Items gefunden.', 'info');
            }
            
            setTimeout(() => this.end(true, false), 2000);
        } else {
            this.playerTurn = false;
            setTimeout(() => this.enemyTurn(), 1000);
        }
    },
    
    showDamageNumber(damage, isCrit, isPlayer) {
        const arena = document.getElementById('combat-arena');
        const num = document.createElement('div');
        num.className = `damage-number ${isCrit ? 'critical' : 'damage'}`;
        num.textContent = damage;
        
        const targetSprite = isPlayer ? document.getElementById('player-sprite') : document.getElementById('enemy-sprite');
        const rect = targetSprite.getBoundingClientRect();
        const arenaRect = arena.getBoundingClientRect();
        
        num.style.left = (rect.left - arenaRect.left + rect.width / 2) + 'px';
        num.style.top = (rect.top - arenaRect.top) + 'px';
        
        arena.appendChild(num);
        setTimeout(() => num.remove(), 1000);
    },
    
    end(victory, fled = false) {
        this.active = false;
        document.getElementById('combat-overlay').classList.remove('active');
        
        // Special handling for bandit
        if (victory && this.currentEnemyObjectId === 'forest_bandit') {
            Player.flags.bandit_dead = true;
            Game.showNotification('Der Bandit ist tot. Du kannst nun zurück zur Frau.');
        }
        
        // Special handling for rat queen - cellar is cleared
        if (victory && this.currentEnemyObjectId === 'rat_queen') {
            Player.flags.cellar_cleared = true;
            Game.showNotification('Die Rattenkönigin ist tot! Der Keller ist sicher.');
        }
        
        // Special handling for Grimm - the murderer
        if (victory && this.currentEnemyObjectId === 'grimm_fight') {
            Player.flags.grimm_dead = true;
            Game.showNotification('Grimm der Schlächter ist tot! Dein Bruder ist gerächt. Der Weg nach Steinwacht ist frei.');
            Player.gainXP(50); // Bonus XP
        }
        
        Game.updateUI();
        
        // Re-render scene to remove dead enemies
        if (victory) {
            SceneManager.render();
        }
    }
};

// ==================== DIALOG SYSTEM ====================
const Dialog = {
    active: false,
    currentNPC: null,
    currentDialog: null,
    
    start(npcId) {
        const npcData = GameData.npcs[npcId];
        if (!npcData) return;
        
        this.active = true;
        this.currentNPC = npcData;
        
        // Use currentDialog if set, otherwise 'default'
        const dialogToShow = npcData.currentDialog || 'default';
        this.showDialog(dialogToShow);
    },
    
    showDialog(dialogId) {
        const dialog = this.currentNPC.dialogs[dialogId];
        if (!dialog) {
            // Fallback to default if dialog not found
            if (dialogId !== 'default' && this.currentNPC.dialogs['default']) {
                this.showDialog('default');
                return;
            }
            this.end();
            return;
        }
        
        // Check option conditions
        const availableOptions = dialog.options.filter(opt => !opt.condition || opt.condition());
        
        this.currentDialog = dialog;
        
        document.getElementById('dialog-overlay').classList.add('active');
        document.getElementById('dialog-speaker').textContent = this.currentNPC.name;
        
        // Support dynamic text (function or string)
        const dialogText = typeof dialog.text === 'function' ? dialog.text() : dialog.text;
        document.getElementById('dialog-text').textContent = dialogText;
        
        const optionsContainer = document.getElementById('dialog-options');
        optionsContainer.innerHTML = '';
        
        for (const option of availableOptions) {
            const btn = document.createElement('div');
            btn.className = 'dialog-option';
            btn.textContent = option.text;
            btn.onclick = () => this.selectOption(option);
            optionsContainer.appendChild(btn);
        }
    },
    
    selectOption(option) {
        // Execute action if any
        if (option.action) {
            this.executeAction(option.action);
        }
        
        // Go to next dialog or end
        if (option.next) {
            this.showDialog(option.next);
        } else {
            this.end();
        }
    },
    
    executeAction(action) {
        switch (action) {
            case 'give_starting_items':
                Player.addItem('bread', 1);
                Player.addItem('blunt_sword', 1);
                Player.flags.witness_helped = true;
                break;
            case 'witness_leaves':
                Player.flags.witness_gone = true;
                SceneManager.removeObjectFromScene('awakening', 'witness');
                if (!Player.flags.road_unlocked) {
                    Player.flags.road_unlocked = true;
                    Game.showNotification('Der Pfad zum Dorf ist nun frei.');
                }
                SceneManager.render();
                break;
            
            // Tavern & Innkeeper quests
            case 'go_to_tavern':
                Player.flags.met_daughter = true;
                Game.showNotification('Lina führt dich zur Taverne...');
                setTimeout(() => {
                    SceneManager.load('tavern');
                    Player.flags.met_innkeeper = true;
                    GameData.npcs.innkeeper.currentDialog = 'first_meeting';
                }, 1000);
                break;
            case 'wash_and_heal':
                Player.health = Player.maxHealth;
                Game.showNotification('Du wäschst dich und fühlst dich erfrischt. Volle HP!');
                Game.updateUI();
                GameData.npcs.innkeeper.currentDialog = 'after_wash';
                break;
            case 'start_meat_quest':
                Player.addGold(60);
                Player.flags.meat_quest_started = true;
                Player.activeQuests.push({ id: 'meat', name: 'Fleisch für den Wirt', description: 'Kaufe Fleisch beim Bauern (50 Gold) und bringe es zum Wirt.', progress: 0, target: 1 });
                GameData.npcs.innkeeper.currentDialog = 'waiting_for_meat';
                Game.showNotification('Quest gestartet: Fleisch für den Wirt');
                Player.gainXP(10);
                break;
            case 'deliver_meat':
                if (Player.hasItem('raw_meat')) {
                    Player.removeItem('raw_meat', 1);
                }
                break;
            case 'complete_meat_quest':
                Player.flags.meat_quest_done = true;
                Player.activeQuests = Player.activeQuests.filter(q => q.id !== 'meat');
                GameData.npcs.innkeeper.currentDialog = 'after_meat_quest';
                Game.showNotification('Quest abgeschlossen! +50 XP');
                Player.gainXP(50);
                break;
            
            // Innkeeper shop with stock
            case 'buy_beer_innkeeper':
                if (Player.flags.innkeeper_beer_stock === undefined) Player.flags.innkeeper_beer_stock = 5;
                if (Player.flags.innkeeper_beer_stock > 0) {
                    Player.gold -= 10;
                    Player.addItem('beer', 1);
                    Player.flags.innkeeper_beer_stock--;
                    Player.flags.beers_drunk = (Player.flags.beers_drunk || 0) + 1;
                    if (Player.flags.beers_drunk % 5 === 0 && Player.flags.beers_drunk <= 20) {
                        Player.baseIntelligence += 1;
                        Player.recalculateStats();
                        Game.showNotification('Dauerhaft +1 Mana durch Bier-Toleranz!');
                        if (Player.flags.beers_drunk === 20) {
                            Player.health = Player.maxHealth;
                            Game.showNotification('Maximum erreicht! Volle LP als Bonus!');
                        }
                    }
                    Game.showNotification(`Bier gekauft! (Noch ${Player.flags.innkeeper_beer_stock} übrig)`);
                    Game.updateUI();
                }
                break;
            case 'buy_bread_innkeeper':
                if (Player.flags.innkeeper_bread_stock === undefined) Player.flags.innkeeper_bread_stock = 5;
                if (Player.flags.innkeeper_bread_stock > 0) {
                    Player.gold -= 10;
                    Player.addItem('bread', 1);
                    Player.flags.innkeeper_bread_stock--;
                    Game.showNotification(`Brot gekauft! (Noch ${Player.flags.innkeeper_bread_stock} übrig)`);
                    Game.updateUI();
                }
                break;
            case 'buy_cooked_meat':
                if (Player.flags.innkeeper_meat_stock === undefined) Player.flags.innkeeper_meat_stock = 10;
                if (Player.flags.innkeeper_meat_stock > 0) {
                    Player.gold -= 25;
                    Player.addItem('cooked_meat', 1);
                    Player.flags.innkeeper_meat_stock--;
                    Game.showNotification(`Fleisch gekauft! (Noch ${Player.flags.innkeeper_meat_stock} übrig)`);
                    Game.updateUI();
                }
                break;
            
            // Old buy actions - keep for free items
            case 'buy_beer':
                Player.gold -= 10;
                Player.addItem('beer', 1);
                Player.flags.beers_drunk = (Player.flags.beers_drunk || 0) + 1;
                // Every 5 beers = +1 max mana
                if (Player.flags.beers_drunk % 5 === 0 && Player.flags.beers_drunk <= 20) {
                    Player.baseIntelligence += 1;
                    Player.recalculateStats();
                    Game.showNotification('Dauerhaft +1 Mana durch Bier-Toleranz!');
                    if (Player.flags.beers_drunk === 20) {
                        Player.health = Player.maxHealth;
                        Game.showNotification('Maximum erreicht! Volle LP als Bonus!');
                    }
                }
                Game.updateUI();
                break;
            
            // Innkeeper shop actions - unlimited stock
            case 'buy_beer_shop':
                if (Player.gold < 10) { Game.showNotification('Nicht genug Gold!'); break; }
                Player.gold -= 10;
                Player.addItem('beer', 1);
                Game.showNotification('Bier gekauft!');
                Game.updateUI();
                break;
            case 'buy_bread_shop':
                if (Player.gold < 10) { Game.showNotification('Nicht genug Gold!'); break; }
                Player.gold -= 10;
                Player.addItem('bread', 1);
                Game.showNotification('Brot gekauft!');
                Game.updateUI();
                break;
            case 'buy_meat_shop':
                if (Player.gold < 25) { Game.showNotification('Nicht genug Gold!'); break; }
                Player.gold -= 25;
                Player.addItem('cooked_meat', 1);
                Game.showNotification('Fleisch gekauft!');
                Game.updateUI();
                break;
            case 'buy_fish':
                if (Player.gold < 15) { Game.showNotification('Nicht genug Gold!'); break; }
                Player.gold -= 15;
                Player.addItem('smoked_fish', 1);
                Game.showNotification('Fisch gekauft!');
                Game.updateUI();
                break;
            
            case 'buy_bread':
                Player.gold -= 10;
                Player.addItem('bread', 1);
                Game.updateUI();
                break;
            case 'buy_cooked_meat':
                Player.gold -= 25;
                Player.addItem('cooked_meat', 1);
                Game.updateUI();
                break;
            
            // Farmer quests
            case 'buy_meat':
                Player.gold -= 50;
                Player.addItem('raw_meat', 1);
                GameData.npcs.farmer.currentDialog = 'default';
                Game.updateUI();
                break;
            case 'start_cow_quest':
                Player.flags.cow_quest_started = true;
                Player.activeQuests.push({ id: 'cow', name: 'Die verlorene Kuh', description: 'Finde die Kuh des Bauern im westlichen Wald.', progress: 0, target: 1 });
                GameData.npcs.farmer.currentDialog = 'waiting_for_cow';
                Game.showNotification('Quest gestartet: Die verlorene Kuh');
                break;
            case 'return_cow':
                Player.flags.cow_returned = true;
                break;
            case 'complete_cow_quest':
                Player.flags.cow_quest_done = true;
                Player.activeQuests = Player.activeQuests.filter(q => q.id !== 'cow');
                Player.addItem('bread', 2);
                GameData.npcs.farmer.currentDialog = 'after_cow_quest';
                Game.showNotification('Quest abgeschlossen! +30 XP');
                Player.gainXP(30);
                break;
            
            // Blacksmith quests
            case 'start_mine_quest':
                Player.addItem('health_potion', 2);
                Player.flags.mine_quest_started = true;
                Player.activeQuests.push({ id: 'mine', name: 'Eisenerz für den Schmied', description: 'Sammle 10 Eisenerz in der Mine im Osten.', progress: 0, target: 10 });
                GameData.npcs.blacksmith.currentDialog = 'waiting_for_ore';
                Game.showNotification('Quest gestartet: Eisenerz für den Schmied');
                SceneManager.render();
                break;
            case 'deliver_ore':
                if (Player.hasItem('iron_ore', 10)) {
                    Player.removeItem('iron_ore', 10);
                }
                break;
            case 'complete_sword_quest':
                if (Player.equipment.weapon === 'blunt_sword') {
                    Player.equipment.weapon = null;
                }
                Player.removeItem('blunt_sword', 1);
                Player.addItem('sharp_sword', 1);
                Player.flags.sword_sharpened = true;
                Player.activeQuests = Player.activeQuests.filter(q => q.id !== 'mine');
                GameData.npcs.blacksmith.currentDialog = 'after_sword_quest';
                // Trigger innkeeper cellar quest
                GameData.npcs.innkeeper.currentDialog = 'cellar_quest_available';
                Game.showNotification('Quest abgeschlossen! +75 XP - Scharfes Schwert erhalten!');
                Player.gainXP(75);
                break;
            
            // Cellar quest
            case 'start_cellar_quest':
                Player.flags.cellar_quest_started = true;
                Player.activeQuests.push({ id: 'cellar', name: 'Ungeziefer im Keller', description: 'Säubere den Keller der Taverne von Ratten.', progress: 0, target: 1 });
                GameData.npcs.innkeeper.currentDialog = 'waiting_cellar';
                Game.showNotification('Quest gestartet: Ungeziefer im Keller');
                SceneManager.render();
                break;
            case 'complete_cellar_quest':
                // Just checking condition
                break;
            case 'cellar_reward_receive':
                Player.addItem('health_potion', 2);
                Player.addItem('mana_potion', 1);
                Player.flags.cellar_quest_done = true;
                Player.flags.free_tavern = true;
                Player.activeQuests = Player.activeQuests.filter(q => q.id !== 'cellar');
                GameData.npcs.innkeeper.currentDialog = 'after_cellar_quest';
                Game.showNotification('Quest abgeschlossen! +65 XP - Kostenlose Kost und Logis!');
                Player.gainXP(65);
                break;
            case 'sleep_tavern':
                Player.health = Player.maxHealth;
                Player.mana = Player.maxMana;
                Game.showNotification('Du fühlst dich ausgeruht! LP und Mana voll aufgefüllt.');
                Game.updateUI();
                break;
            case 'sleep_and_unlock':
                Player.health = Player.maxHealth;
                Player.mana = Player.maxMana;
                Player.flags.city_path_unlocked = true;
                Game.showNotification('Du fühlst dich ausgeruht! Der Weg zur Stadt ist jetzt bekannt.');
                Game.updateUI();
                break;
            case 'unlock_city_path':
                Player.flags.city_path_unlocked = true;
                Game.showNotification('Du kennst jetzt den Weg zur Stadt Grauenfels!');
                break;
            
            // ===== CITY ACTIONS =====
            case 'learn_cathedral':
                Player.flags.cathedral_known = true;
                Game.showNotification('Du weißt jetzt wo die Kathedrale ist.');
                break;
            case 'learn_ruins':
                Player.flags.ruins_known = true;
                Game.showNotification('Du weißt jetzt wo die Ruinen sind.');
                break;
            case 'met_seer':
                Player.flags.met_seer = true;
                GameData.npcs.old_seer.currentDialog = 'after_met';
                break;
            
            // Merchant Viktor quest
            case 'start_merchant_quest':
                Player.flags.merchant_quest_started = true;
                Player.activeQuests.push({ id: 'merchant', name: 'Gestohlene Waren', description: 'Finde Viktors gestohlene Waren in der Kanalisation.', progress: 0, target: 1 });
                GameData.npcs.traveling_merchant.currentDialog = 'waiting_goods';
                Game.showNotification('Quest gestartet: Gestohlene Waren');
                break;
            case 'complete_merchant_quest':
                if (Player.hasItem('merchant_goods')) {
                    Player.removeItem('merchant_goods', 1);
                }
                break;
            case 'merchant_reward':
                Player.addGold(150);
                Player.addItem('magic_ring', 1);
                Player.flags.merchant_quest_done = true;
                Player.activeQuests = Player.activeQuests.filter(q => q.id !== 'merchant');
                GameData.npcs.traveling_merchant.currentDialog = 'after_quest';
                Game.showNotification('Quest abgeschlossen! +150 Gold und Ring der Magie!');
                Player.gainXP(80);
                break;
            case 'enter_sewer':
                SceneManager.loadScene('sewer_entrance');
                break;
            
            // Elara quest
            case 'start_elara_quest':
                Player.flags.elara_quest_started = true;
                Player.flags.cathedral_known = true;
                Player.activeQuests.push({ id: 'elara', name: 'Das heilige Symbol', description: 'Hole das heilige Symbol aus der Kathedrale.', progress: 0, target: 1 });
                GameData.npcs.city_merchant.currentDialog = 'waiting_symbol';
                Game.showNotification('Quest gestartet: Das heilige Symbol');
                break;
            case 'complete_elara_quest':
                if (Player.hasItem('holy_symbol')) {
                    Player.removeItem('holy_symbol', 1);
                }
                break;
            case 'elara_reward':
                Player.addGold(80);
                Player.addItem('large_health_potion', 2);
                Player.flags.elara_quest_done = true;
                Player.activeQuests = Player.activeQuests.filter(q => q.id !== 'elara');
                GameData.npcs.city_merchant.currentDialog = 'after_quest';
                Game.showNotification('Quest abgeschlossen! +80 Gold und 2 große Heiltränke!');
                Player.gainXP(100);
                break;
            
            // Bounty hunter quest
            case 'start_bounty_quest':
                Player.flags.bounty_quest_started = true;
                Player.flags.ruins_known = true;
                Player.activeQuests.push({ id: 'bounty', name: 'Geisterjagd', description: 'Töte die Geister in den Ruinen.', progress: 0, target: 2 });
                GameData.npcs.bounty_hunter.currentDialog = 'waiting_bounty';
                Game.showNotification('Quest gestartet: Geisterjagd');
                break;
            case 'complete_bounty_quest':
                Player.addGold(100);
                Player.flags.bounty_quest_done = true;
                Player.activeQuests = Player.activeQuests.filter(q => q.id !== 'bounty');
                GameData.npcs.bounty_hunter.currentDialog = 'after_quest';
                Game.showNotification('Quest abgeschlossen! +100 Gold!');
                Player.gainXP(70);
                break;
            
            // Mysterious man
            case 'receive_signet_ring':
                Player.addItem('signet_ring', 1);
                Game.showNotification('Du erhältst einen mysteriösen Siegelring.');
                break;
            
            // City shop actions
            case 'buy_large_health_potion':
                if (Player.gold < 50) { Game.showNotification('Nicht genug Gold!'); break; }
                Player.gold -= 50;
                Player.addItem('large_health_potion', 1);
                Game.showNotification('Großer Heiltrank gekauft!');
                Game.updateUI();
                break;
            case 'buy_mana_potion_merchant':
                if (Player.gold < 30) { Game.showNotification('Nicht genug Gold!'); break; }
                Player.gold -= 30;
                Player.addItem('mana_potion', 1);
                Game.showNotification('Manatrank gekauft!');
                Game.updateUI();
                break;
            case 'buy_health_elara':
                if (Player.gold < 25) { Game.showNotification('Nicht genug Gold!'); break; }
                Player.gold -= 25;
                Player.addItem('health_potion', 1);
                Game.showNotification('Heiltrank gekauft!');
                Game.updateUI();
                break;
            case 'buy_mana_elara':
                if (Player.gold < 20) { Game.showNotification('Nicht genug Gold!'); break; }
                Player.gold -= 20;
                Player.addItem('mana_potion', 1);
                Game.showNotification('Manatrank gekauft!');
                Game.updateUI();
                break;
            case 'buy_bread_elara':
                if (Player.gold < 10) { Game.showNotification('Nicht genug Gold!'); break; }
                Player.gold -= 10;
                Player.addItem('bread', 1);
                Game.showNotification('Brot gekauft!');
                Game.updateUI();
                break;
            case 'buy_health_elara_discount':
                if (Player.gold < 15) { Game.showNotification('Nicht genug Gold!'); break; }
                Player.gold -= 15;
                Player.addItem('health_potion', 1);
                Game.showNotification('Heiltrank gekauft (Rabatt)!');
                Game.updateUI();
                break;
            case 'buy_mana_elara_discount':
                if (Player.gold < 12) { Game.showNotification('Nicht genug Gold!'); break; }
                Player.gold -= 12;
                Player.addItem('mana_potion', 1);
                Game.showNotification('Manatrank gekauft (Rabatt)!');
                Game.updateUI();
                break;
            case 'buy_beer_city':
                if (Player.gold < 5) { Game.showNotification('Nicht genug Gold!'); break; }
                Player.gold -= 5;
                Player.addItem('beer', 1);
                Game.showNotification('Dünnes Bier gekauft!');
                Game.updateUI();
                break;
            case 'buy_bread_city':
                if (Player.gold < 4) { Game.showNotification('Nicht genug Gold!'); break; }
                Player.gold -= 4;
                Player.addItem('bread', 1);
                Game.showNotification('Altes Brot gekauft!');
                Game.updateUI();
                break;
            case 'sleep_city_inn':
                if (Player.gold < 20) { Game.showNotification('Nicht genug Gold!'); break; }
                Player.gold -= 20;
                Player.health = Player.maxHealth;
                Player.mana = Player.maxMana;
                Game.showNotification('Du schläfst in der Taverne. LP und Mana aufgefüllt!');
                Game.updateUI();
                break;
            
            // ===== TRAINING ACTIONS =====
            case 'learn_sword_1':
                Player.gold -= 50;
                Player.flags.sword_training = 1;
                Player.flags.sword_bonus = 2;
                Player.recalculateStats();
                Game.showNotification('+2 Schaden permanent! (Schwertkampf Stufe 1)');
                Game.updateUI();
                break;
            case 'learn_sword_2':
                Player.gold -= 100;
                Player.flags.sword_training = 2;
                Player.flags.sword_bonus = 5;
                Player.recalculateStats();
                Game.showNotification('+3 Schaden permanent! (Schwertkampf Stufe 2)');
                Game.updateUI();
                break;
            case 'learn_sword_3':
                Player.gold -= 200;
                Player.flags.sword_training = 3;
                Player.flags.sword_bonus = 9;
                Player.recalculateStats();
                Game.showNotification('+4 Schaden permanent! (Schwertkampf Stufe 3)');
                Game.updateUI();
                break;
            case 'learn_sword_4':
                Player.gold -= 400;
                Player.flags.sword_training = 4;
                Player.flags.sword_bonus = 14;
                Player.recalculateStats();
                Game.showNotification('+5 Schaden permanent! MEISTER! (Schwertkampf Stufe 4)');
                Game.updateUI();
                break;
            case 'learn_bow_1':
                Player.gold -= 50;
                Player.flags.bow_training = 1;
                Player.flags.bow_bonus = 2;
                Game.showNotification('+2 Bogen-Schaden permanent! (Bogenschießen Stufe 1)');
                Game.updateUI();
                break;
            case 'learn_bow_2':
                Player.gold -= 100;
                Player.flags.bow_training = 2;
                Player.flags.bow_bonus = 5;
                Game.showNotification('+3 Bogen-Schaden permanent! (Bogenschießen Stufe 2)');
                Game.updateUI();
                break;
            case 'learn_bow_3':
                Player.gold -= 200;
                Player.flags.bow_training = 3;
                Player.flags.bow_bonus = 9;
                Game.showNotification('+4 Bogen-Schaden permanent! (Bogenschießen Stufe 3)');
                Game.updateUI();
                break;
            case 'learn_bow_4':
                Player.gold -= 400;
                Player.flags.bow_training = 4;
                Player.flags.bow_bonus = 14;
                Game.showNotification('+5 Bogen-Schaden permanent! MEISTERSCHÜTZE! (Bogenschießen Stufe 4)');
                Game.updateUI();
                break;
            case 'learn_hunt_1':
                Player.gold -= 30;
                Player.flags.hunt_training = 1;
                Player.flags.hunt_bonus = 0.10;
                Game.showNotification('+10% Tier-Drops! (Jagd Stufe 1)');
                Game.updateUI();
                break;
            case 'learn_hunt_2':
                Player.gold -= 60;
                Player.flags.hunt_training = 2;
                Player.flags.hunt_bonus = 0.25;
                Game.showNotification('+15% Tier-Drops! (Jagd Stufe 2)');
                Game.updateUI();
                break;
            case 'learn_hunt_3':
                Player.gold -= 120;
                Player.flags.hunt_training = 3;
                Player.flags.hunt_bonus = 0.50;
                Game.showNotification('+25% Tier-Drops! MEISTERJÄGER! (Jagd Stufe 3)');
                Game.updateUI();
                break;
            
            // ===== HEALER QUEST (Connected Quests) =====
            case 'start_healer_quest':
                Player.flags.healer_quest_started = true;
                GameData.npcs.sick_healer.currentDialog = 'waiting';
                Game.showNotification('Quest gestartet: Hilf dem kranken Heiler');
                break;
            case 'receive_herbs':
                Player.addItem('healing_herbs', 1);
                GameData.npcs.herb_collector.currentDialog = 'after_quest';
                Game.showNotification('Du hast die Heilkräuter erhalten.');
                break;
            case 'complete_healer_quest':
                Player.removeItem('healing_herbs', 1);
                Player.flags.healer_quest_done = true;
                break;
            case 'healer_reward':
                Player.addGold(40);
                Player.flags.medicine_quest_done = true;
                GameData.npcs.sick_healer.currentDialog = 'after_quest';
                Player.gainXP(60);
                Game.showNotification('+40 Gold, +60 XP - Marcus ist geheilt!');
                Game.updateUI();
                break;
            case 'buy_heal_marcus':
                if (Player.gold >= 15) {
                    Player.gold -= 15;
                    Player.health = Player.maxHealth;
                    Game.showNotification('Marcus heilt deine Wunden vollständig.');
                    Game.updateUI();
                }
                break;
            case 'give_beggar_gold':
                Player.gold -= 5;
                Player.gainXP(10);
                Game.showNotification('-5 Gold, +10 XP (Gute Tat)');
                GameData.npcs.hungry_beggar.currentDialog = 'grateful';
                Game.updateUI();
                break;
            
            // ===== GRIMM QUEST =====
            case 'unlock_alley':
                Player.flags.alley_unlocked = true;
                Game.showNotification('Du weißt jetzt wo du Grimm findest.');
                break;
            case 'fight_grimm':
                Combat.start('grimm_enemy', 'grimm_fight');
                break;
            case 'loot_grimm':
                Player.flags.looted_grimm = true;
                Player.addGold(30);
                Player.addItem('grimms_blade', 1);
                Game.showNotification('Du findest 30 Gold und Grimms blutige Klinge.');
                SceneManager.updateNavigation();
                break;
            
            // ===== STEINWACHT ACTIONS =====
            case 'unlock_archive':
                Player.flags.archive_unlocked = true;
                Game.showNotification('Du kannst jetzt das Archiv besuchen.');
                break;
            case 'pay_archivist':
                Player.gold -= 50;
                Game.updateUI();
                break;
            case 'allow_records_search':
                Player.flags.can_search_records = true;
                Game.showNotification('Du darfst jetzt die Familienregister durchsuchen.');
                break;
            case 'receive_fortress_plans':
                Player.addItem('fortress_plans', 1);
                Player.flags.has_fortress_plans = true;
                Game.showNotification('+150 XP - Du hast die Baupläne erhalten!');
                Player.gainXP(150);
                break;
            
            // Steinwacht shops
            case 'buy_large_health_steinwacht':
                if (Player.gold < 50) { Game.showNotification('Nicht genug Gold!'); break; }
                Player.gold -= 50;
                Player.addItem('large_health_potion', 1);
                Game.showNotification('Großer Heiltrank gekauft!');
                Game.updateUI();
                break;
            case 'buy_mana_steinwacht':
                if (Player.gold < 25) { Game.showNotification('Nicht genug Gold!'); break; }
                Player.gold -= 25;
                Player.addItem('mana_potion', 1);
                Game.showNotification('Manatrank gekauft!');
                Game.updateUI();
                break;
            case 'buy_bread_steinwacht':
                if (Player.gold < 8) { Game.showNotification('Nicht genug Gold!'); break; }
                Player.gold -= 8;
                Player.addItem('bread', 1);
                Game.showNotification('Brot gekauft!');
                Game.updateUI();
                break;
            case 'buy_steel_sword':
                if (Player.gold < 120) { Game.showNotification('Nicht genug Gold!'); break; }
                Player.gold -= 120;
                Player.addItem('steel_sword', 1);
                Player.flags.bought_steel_sword = true;
                Game.showNotification('Stahlschwert gekauft!');
                Game.updateUI();
                break;
            case 'buy_reinforced_shield':
                if (Player.gold < 80) { Game.showNotification('Nicht genug Gold!'); break; }
                Player.gold -= 80;
                Player.addItem('reinforced_shield', 1);
                Player.flags.bought_reinforced_shield = true;
                Game.showNotification('Verstärkter Schild gekauft!');
                Game.updateUI();
                break;
            case 'buy_plate_armor':
                if (Player.gold < 150) { Game.showNotification('Nicht genug Gold!'); break; }
                Player.gold -= 150;
                Player.addItem('plate_armor', 1);
                Player.flags.bought_plate_armor = true;
                Game.showNotification('Plattenrüstung gekauft!');
                Game.updateUI();
                break;
            
            case 'free_beer':
                Player.addItem('beer', 1);
                Player.flags.beers_drunk = (Player.flags.beers_drunk || 0) + 1;
                if (Player.flags.beers_drunk % 5 === 0 && Player.flags.beers_drunk <= 20) {
                    Player.baseIntelligence += 1;
                    Player.recalculateStats();
                    Game.showNotification('Dauerhaft +1 Mana durch Bier-Toleranz!');
                    if (Player.flags.beers_drunk === 20) {
                        Player.health = Player.maxHealth;
                        Game.showNotification('Maximum erreicht! Volle LP als Bonus!');
                    }
                }
                Game.updateUI();
                break;
            case 'free_food':
                Player.addItem('cooked_meat', 1);
                Game.updateUI();
                break;
            
            case 'open_blacksmith_shop':
                Game.showNotification('Der Schmied hat nichts zum Verkaufen im Moment.');
                break;
            case 'open_blacksmith_sell':
                // Sell items - for now just show message
                if (Player.hasItem('bandit_dagger')) {
                    Player.removeItem('bandit_dagger', 1);
                    Player.addGold(8);
                    Game.showNotification('Banditen-Dolch für 8 Gold verkauft!');
                } else {
                    Game.showNotification('Du hast nichts Interessantes zu verkaufen.');
                }
                break;
            
            // Hunter quest
            case 'start_wolf_quest':
                Player.flags.wolf_quest_started = true;
                Player.activeQuests.push({ id: 'wolf', name: 'Wolfsfelle für den Jäger', description: 'Bringe 3 Wolfsfelle zum Jäger.', progress: 0, target: 3 });
                GameData.npcs.hunter.currentDialog = 'waiting_for_pelts';
                Game.showNotification('Quest gestartet: Wolfsfelle für den Jäger');
                break;
            case 'deliver_pelts':
                if (Player.hasItem('wolf_pelt', 3)) {
                    Player.removeItem('wolf_pelt', 3);
                }
                break;
            case 'complete_wolf_quest':
                Player.addItem('hunting_bow', 1);
                Player.flags.wolf_quest_done = true;
                Player.activeQuests = Player.activeQuests.filter(q => q.id !== 'wolf');
                GameData.npcs.hunter.currentDialog = 'after_quest';
                Game.showNotification('Quest abgeschlossen! +60 XP - Jagdbogen erhalten!');
                Player.gainXP(60);
                break;
            
            // Worried woman quest
            case 'start_husband_quest':
                Player.flags.husband_quest_started = true;
                Player.activeQuests.push({ id: 'husband', name: 'Der vermisste Ehemann', description: 'Finde den vermissten Mann im nördlichen Wald.', progress: 0, target: 1 });
                GameData.npcs.worried_woman.currentDialog = 'waiting';
                Game.showNotification('Quest gestartet: Der vermisste Ehemann');
                break;
            case 'tell_about_husband':
                // Already found body, telling her
                break;
            // Worried woman quest - NEW VERSION
            case 'complete_husband_quest_gold':
                // Truth + took gold = 2x XP + 50 gold
                Player.removeItem('husband_amulet', 1);
                Player.addGold(50);
                Player.flags.husband_quest_done = true;
                Player.flags.gave_amulet = true;
                Game.showNotification('Quest abgeschlossen! +80 XP +50 Gold');
                Player.gainXP(80);
                break;
            case 'complete_husband_quest_noble':
                // Truth + refused gold = 3x XP + free weapon from blacksmith
                Player.removeItem('husband_amulet', 1);
                Player.flags.husband_quest_done = true;
                Player.flags.gave_amulet = true;
                Player.flags.noble_deed = true;
                Game.showNotification('Quest abgeschlossen! +120 XP (Dreifache XP!) - Der Schmied hat von deiner Tat gehört!');
                Player.gainXP(120);
                // Blacksmith will give free weapon
                GameData.npcs.blacksmith.currentDialog = 'noble_reward';
                break;
            case 'complete_husband_quest_lie':
                // Lied and kept amulet = normal XP only
                Player.flags.husband_quest_done = true;
                Game.showNotification('Quest abgeschlossen! +40 XP (Du behältst das Amulett)');
                Player.gainXP(40);
                break;
            case 'complete_husband_quest_amulet':
                // Old action - redirect to gold version
                Player.removeItem('husband_amulet', 1);
                Player.addGold(50);
                Player.flags.husband_quest_done = true;
                Player.flags.gave_amulet = true;
                Game.showNotification('Quest abgeschlossen! +80 XP');
                Player.gainXP(80);
                break;
            case 'complete_husband_quest_no_amulet':
                // Old action
                Player.flags.husband_quest_done = true;
                Game.showNotification('Quest abgeschlossen! +40 XP');
                Player.gainXP(40);
                break;
            
            // Old actions - keep for compatibility
            case 'start_husband_quest':
                Player.flags.husband_quest_started = true;
                GameData.npcs.worried_woman.currentDialog = 'waiting';
                Game.showNotification('Quest gestartet: Der vermisste Ehemann');
                break;
            case 'complete_husband_quest':
                Player.addGold(60);
                Player.flags.husband_quest_done = true;
                Game.showNotification('Quest abgeschlossen! +40 XP');
                Player.gainXP(40);
                break;
            case 'complete_husband_quest_no_gold':
                Player.flags.husband_quest_done = true;
                Game.showNotification('Quest abgeschlossen! +80 XP');
                Player.gainXP(80);
                break;
            case 'tell_about_husband':
                break;
            
            // Herbalist quest
            case 'start_herb_quest':
                Player.flags.herb_quest_started = true;
                Player.activeQuests.push({ id: 'herbs', name: 'Mondblumenkraut', description: 'Sammle 5 Mondblumenkraut im westlichen Sumpf.', progress: 0, target: 5 });
                GameData.npcs.herbalist.currentDialog = 'waiting';
                Game.showNotification('Quest gestartet: Mondblumenkraut');
                break;
            case 'deliver_herbs':
                if (Player.hasItem('moonflower', 5)) {
                    Player.removeItem('moonflower', 5);
                }
                break;
            case 'complete_herb_quest':
                Player.addItem('large_health_potion', 2);
                Player.flags.herb_quest_done = true;
                Player.activeQuests = Player.activeQuests.filter(q => q.id !== 'herbs');
                GameData.npcs.herbalist.currentDialog = 'after_quest';
                Game.showNotification('Quest abgeschlossen! +45 XP - 2 Große Heiltränke erhalten!');
                Player.gainXP(45);
                break;
            case 'buy_health_potion':
                Player.gold -= 25;
                Player.addItem('health_potion', 1);
                Game.updateUI();
                break;
            case 'buy_large_health_potion':
                Player.gold -= 50;
                Player.addItem('large_health_potion', 1);
                Game.updateUI();
                break;
            
            // Sell actions - Innkeeper
            case 'sell_frog_leg':
                Player.removeItem('frog_leg', 1);
                Player.addGold(3);
                Game.showNotification('+3 Gold');
                break;
            case 'sell_wolf_meat':
                Player.removeItem('wolf_meat', 1);
                Player.addGold(5);
                Game.showNotification('+5 Gold');
                break;
            case 'sell_rat_tail':
                Player.removeItem('rat_tail', 1);
                Player.addGold(1);
                Game.showNotification('+1 Gold');
                break;
            
            // Sell actions - Herbalist
            case 'sell_spider_egg':
                Player.removeItem('spider_egg', 1);
                Player.addGold(10);
                Game.showNotification('+10 Gold');
                break;
            case 'sell_poison_sac':
                Player.removeItem('poison_sac', 1);
                Player.addGold(25);
                Game.showNotification('+25 Gold');
                break;
            case 'sell_lizard_tail':
                Player.removeItem('lizard_tail', 1);
                Player.addGold(8);
                Game.showNotification('+8 Gold');
                break;
            case 'sell_moonflower':
                Player.removeItem('moonflower', 1);
                Player.addGold(10);
                Game.showNotification('+10 Gold');
                break;
            
            // Sell actions - Blacksmith
            case 'sell_bandit_dagger':
                Player.removeItem('bandit_dagger', 1);
                Player.addGold(8);
                Game.showNotification('+8 Gold');
                break;
            case 'sell_spider_leg':
                Player.removeItem('spider_leg', 1);
                Player.addGold(2);
                Game.showNotification('+2 Gold');
                break;
            case 'sell_giant_spider_leg':
                Player.removeItem('giant_spider_leg', 1);
                Player.addGold(15);
                Game.showNotification('+15 Gold');
                break;
            case 'sell_spider_silk':
                Player.removeItem('spider_silk', 1);
                Player.addGold(12);
                Game.showNotification('+12 Gold');
                break;
            case 'sell_lizard_scale':
                Player.removeItem('lizard_scale', 1);
                Player.addGold(4);
                Game.showNotification('+4 Gold');
                break;
            case 'sell_wolf_pelt':
                Player.removeItem('wolf_pelt', 1);
                Player.addGold(15);
                Game.showNotification('+15 Gold');
                break;
            
            // Buy actions - Blacksmith (with gold check)
            case 'buy_iron_sword':
                if (Player.gold < 50) { Game.showNotification('Nicht genug Gold!'); break; }
                Player.gold -= 50;
                Player.addItem('iron_sword', 1);
                Player.flags.bought_iron_sword = true;
                Game.showNotification('Eisenschwert erhalten!');
                Game.updateUI();
                break;
            case 'buy_short_sword':
                if (Player.gold < 30) { Game.showNotification('Nicht genug Gold!'); break; }
                Player.gold -= 30;
                Player.addItem('short_sword', 1);
                Player.flags.bought_short_sword = true;
                Game.showNotification('Kurzschwert erhalten!');
                Game.updateUI();
                break;
            case 'buy_battle_axe':
                if (Player.gold < 75) { Game.showNotification('Nicht genug Gold!'); break; }
                Player.gold -= 75;
                Player.addItem('battle_axe', 1);
                Player.flags.bought_battle_axe = true;
                Game.showNotification('Streitaxt erhalten!');
                Game.updateUI();
                break;
            case 'buy_wooden_shield':
                if (Player.gold < 20) { Game.showNotification('Nicht genug Gold!'); break; }
                Player.gold -= 20;
                Player.addItem('wooden_shield', 1);
                Player.flags.bought_wooden_shield = true;
                Game.showNotification('Holzschild erhalten!');
                Game.updateUI();
                break;
            case 'buy_iron_shield':
                if (Player.gold < 40) { Game.showNotification('Nicht genug Gold!'); break; }
                Player.gold -= 40;
                Player.addItem('iron_shield', 1);
                Player.flags.bought_iron_shield = true;
                Game.showNotification('Eisenschild erhalten!');
                Game.updateUI();
                break;
            case 'buy_leather_armor':
                if (Player.gold < 35) { Game.showNotification('Nicht genug Gold!'); break; }
                Player.gold -= 35;
                Player.addItem('leather_armor', 1);
                Player.flags.bought_leather_armor = true;
                Game.showNotification('Lederrüstung erhalten!');
                Game.updateUI();
                break;
            case 'buy_chainmail':
                if (Player.gold < 60) { Game.showNotification('Nicht genug Gold!'); break; }
                Player.gold -= 60;
                Player.addItem('chainmail', 1);
                Player.flags.bought_chainmail = true;
                Game.showNotification('Kettenhemd erhalten!');
                Game.updateUI();
                break;
            case 'sell_wolf_pelt':
                Player.removeItem('wolf_pelt', 1);
                Player.addGold(15);
                Game.showNotification('+15 Gold');
                break;
            case 'receive_noble_weapon':
                Player.addItem('iron_sword', 1);
                Player.flags.received_noble_reward = true;
                GameData.npcs.blacksmith.currentDialog = 'after_sword_quest';
                Game.showNotification('Eisenschwert erhalten! (100 Gold Wert!)');
                break;
            
            // Fisherman quest
            case 'start_fishing_rod_quest':
                Player.flags.fishing_rod_quest_started = true;
                Player.activeQuests.push({ id: 'fishing_rod', name: 'Die alte Angelrute', description: 'Finde die Angelrute des Fischers am westlichen See.', progress: 0, target: 1 });
                GameData.npcs.old_fisherman.currentDialog = 'waiting';
                Game.showNotification('Quest gestartet: Die alte Angelrute');
                break;
            case 'deliver_fishing_rod':
                if (Player.hasItem('old_fishing_rod')) {
                    Player.removeItem('old_fishing_rod', 1);
                }
                break;
            case 'complete_fishing_rod_quest':
                Player.addGold(80);
                Player.flags.fishing_rod_quest_done = true;
                Player.activeQuests = Player.activeQuests.filter(q => q.id !== 'fishing_rod');
                GameData.npcs.old_fisherman.currentDialog = 'after_quest';
                Game.showNotification('Quest abgeschlossen! +55 XP');
                Player.gainXP(55);
                break;
            
            // Old quests
            case 'give_potion':
                Player.addItem('health_potion', 2);
                break;
            case 'start_quest_rats':
                Game.showNotification('Quest angenommen: Rattenplage');
                Player.activeQuests.push({ id: 'rats', name: 'Rattenplage', progress: 0, target: 5 });
                break;
            case 'start_quest_ruins':
                Game.showNotification('Quest angenommen: Die Ruinen');
                Player.activeQuests.push({ id: 'ruins', name: 'Die Ruinen', progress: 0, target: 1 });
                break;
            case 'open_shop':
                Game.showNotification('Shop kommt bald!');
                break;
        }
    },
    
    end() {
        this.active = false;
        this.currentNPC = null;
        document.getElementById('dialog-overlay').classList.remove('active');
    }
};

// ==================== SCENE MANAGER ====================
const SceneManager = {
    currentScene: null,
    pickedItems: new Set(), // Track picked up items
    openedContainers: new Set(), // Track opened containers
    
    load(sceneId) {
        const sceneData = GameData.scenes[sceneId];
        if (!sceneData) {
            console.error('Scene not found:', sceneId);
            return;
        }
        
        // Transition effect
        const transition = document.getElementById('scene-transition');
        transition.classList.add('active');
        
        setTimeout(() => {
            this.currentScene = sceneData;
            Player.currentScene = sceneId;
            
            // Update location indicator
            document.getElementById('location-name').textContent = sceneData.name;
            document.getElementById('location-desc').textContent = sceneData.description;
            
            // Render scene
            this.render();
            
            // Check for random encounters
            this.checkRandomEncounter();
            
            transition.classList.remove('active');
        }, 500);
    },
    
    render() {
        const container = document.getElementById('scene-container');
        container.innerHTML = '';
        
        // Background
        const bg = document.createElement('div');
        bg.className = `scene-background ${this.currentScene.background}`;
        container.appendChild(bg);
        
        // Check if we need to add road exit in awakening scene
        if (this.currentScene.id === 'awakening' && Player.flags.road_unlocked) {
            const hasExit = this.currentScene.objects.some(obj => obj.id === 'exit_road');
            if (!hasExit) {
                this.currentScene.objects.push({
                    type: 'exit',
                    id: 'exit_road',
                    name: 'Pfad zum Dorf',
                    x: 85,
                    y: 40,
                    width: 12,
                    height: 20,
                    target: 'road_to_village'
                });
            }
        }
        
        // Render objects
        for (const obj of this.currentScene.objects) {
            // Skip picked items
            if (obj.type === 'item' && this.pickedItems.has(obj.id)) continue;
            
            // Skip objects with condition that returns false
            if (obj.condition && !obj.condition()) continue;
            
            const element = this.createObject(obj);
            if (element) container.appendChild(element);
        }
        
        // Update minimap
        this.updateMinimap();
        
        // Update navigation buttons
        this.updateNavigation();
    },
    
    createObject(obj) {
        const element = document.createElement('div');
        element.className = 'clickable-object';
        element.dataset.id = obj.id;
        element.dataset.type = obj.type;
        element.dataset.name = obj.name;
        
        element.style.left = obj.x + '%';
        element.style.top = obj.y + '%';
        element.style.width = obj.width + '%';
        element.style.height = obj.height + '%';
        
        switch (obj.type) {
            case 'house':
                element.classList.add('house');
                const door = document.createElement('div');
                door.className = 'house-door';
                element.appendChild(door);
                element.onclick = () => this.enterLocation(obj.target);
                break;
                
            case 'npc':
                if (obj.id === 'witness') {
                    element.classList.add('witness-npc');
                } else {
                    element.classList.add('npc');
                }
                element.onclick = () => Dialog.start(obj.id);
                break;
                
            case 'enemy':
                // Check if enemy is dead
                if (Player.flags[obj.id + '_dead']) return null;
                
                element.classList.add('enemy');
                if (obj.enemyId && obj.enemyId.includes('spider')) {
                    element.classList.add('enemy-spider');
                }
                // Show enemy icon
                const enemyData = GameData.enemies[obj.enemyId];
                if (enemyData) {
                    element.textContent = enemyData.icon;
                }
                element.onclick = () => Combat.start(obj.enemyId, obj.id);
                break;
                
            case 'item':
                element.classList.add('ground-item');
                const itemData = GameData.items[obj.itemId];
                if (itemData) {
                    element.textContent = itemData.icon;
                    element.style.fontSize = '20px';
                }
                element.onclick = () => this.pickupItem(obj);
                break;
                
            case 'container':
                element.style.background = 'linear-gradient(180deg, #4a3a2a 0%, #2a1a0a 100%)';
                element.style.border = '2px solid #5a4a3a';
                element.style.borderRadius = '4px';
                element.onclick = () => this.openContainer(obj);
                break;
                
            case 'exit':
                element.style.background = 'rgba(100, 150, 100, 0.3)';
                element.style.border = '2px dashed rgba(100, 200, 100, 0.5)';
                element.style.borderRadius = '4px';
                element.onclick = () => this.enterLocation(obj.target);
                break;
                
            case 'examine':
                element.classList.add('examine-object');
                // Special styling for specific objects
                if (obj.id === 'severed_head') {
                    element.classList.add('severed-head');
                } else if (obj.id === 'blood_pool') {
                    element.classList.add('blood-pool');
                }
                element.onclick = () => this.examineObject(obj);
                break;
        }
        
        return element;
    },
    
    examineObject(obj) {
        if (obj.examineText) {
            Game.showExamineText(obj.name, obj.examineText);
            
            // Special flag for husband body
            if (obj.id === 'dead_body') {
                Player.flags.found_husband_body = true;
                this.updateNavigation();
            }
            
            // Special flag for dead cow - updates farmer quest
            if (obj.id === 'dead_cow') {
                Player.flags.saw_dead_cow = true;
                Player.flags.found_cow = true; // For farmer dialog
                this.updateNavigation();
            }
            
            // Special flag for cathedral altar
            if (obj.id === 'cathedral_altar') {
                Player.flags.examined_altar = true;
                this.updateNavigation();
            }
            
            // Special flag for old documents in ruins
            if (obj.id === 'old_documents') {
                Player.flags.found_documents = true;
                Game.showNotification('+50 XP - Wichtige Entdeckung!');
                Player.gainXP(50);
                this.updateNavigation();
            }
            
            // Special flag for family records in Steinwacht
            if (obj.id === 'family_records') {
                Player.flags.found_family_records = true;
                Player.flags.met_aldric = true;
                GameData.npcs.aldric.currentDialog = 'after_revelation';
                Game.showNotification('+100 XP - Du hast die Wahrheit über deine Familie entdeckt!');
                Player.gainXP(100);
                this.updateNavigation();
            }
        }
    },
    
    enterLocation(sceneId) {
        if (GameData.scenes[sceneId]) {
            this.load(sceneId);
        } else {
            Game.showNotification('Dieser Bereich ist noch nicht zugänglich.');
        }
    },
    
    pickupItem(obj) {
        if (Player.addItem(obj.itemId, 1)) {
            this.pickedItems.add(obj.id);
            this.render();
            Game.updateInventoryUI();
        }
    },
    
    openContainer(obj) {
        if (this.openedContainers.has(obj.id)) {
            Game.showNotification('Bereits geleert.');
            return;
        }
        
        for (const itemId of obj.contents) {
            Player.addItem(itemId, 1);
        }
        
        this.openedContainers.add(obj.id);
        Game.showNotification('Truhe geöffnet!');
        Game.updateInventoryUI();
    },
    
    checkRandomEncounter() {
        if (!this.currentScene.enemies) return;
        
        for (const enemySpawn of this.currentScene.enemies) {
            if (Math.random() < enemySpawn.chance) {
                setTimeout(() => {
                    Combat.start(enemySpawn.type);
                }, 1000);
                break;
            }
        }
    },
    
    updateMinimap() {
        const minimap = document.getElementById('minimap');
        minimap.innerHTML = '';
        
        // Player marker
        const playerMarker = document.createElement('div');
        playerMarker.className = 'minimap-marker marker-player';
        playerMarker.style.left = '50%';
        playerMarker.style.top = '50%';
        minimap.appendChild(playerMarker);
        
        // Object markers
        for (const obj of this.currentScene.objects) {
            // Skip objects with condition that returns false
            if (obj.condition && !obj.condition()) continue;
            
            if (obj.type === 'house') {
                const marker = document.createElement('div');
                marker.className = 'minimap-marker marker-building';
                marker.style.left = (obj.x / 100 * 100) + '%';
                marker.style.top = (obj.y / 100 * 80 + 10) + '%';
                minimap.appendChild(marker);
            } else if (obj.type === 'npc') {
                const marker = document.createElement('div');
                marker.className = 'minimap-marker marker-npc';
                marker.style.left = (obj.x / 100 * 100) + '%';
                marker.style.top = (obj.y / 100 * 80 + 10) + '%';
                minimap.appendChild(marker);
            }
        }
    },
    
    updateNavigation() {
        const panel = document.getElementById('navigation-panel');
        panel.innerHTML = '';
        
        if (!this.currentScene || !this.currentScene.navigation) return;
        
        const nav = this.currentScene.navigation;
        
        // Direction exits row (North)
        const northExits = nav.exits.filter(e => e.direction === 'north' && (!e.condition || e.condition()));
        if (northExits.length > 0) {
            const northRow = document.createElement('div');
            northRow.className = 'nav-row';
            northExits.forEach(exit => {
                const btn = document.createElement('button');
                btn.className = 'nav-btn nav-north';
                btn.textContent = exit.label;
                btn.onclick = () => this.enterLocation(exit.target);
                northRow.appendChild(btn);
            });
            panel.appendChild(northRow);
        }
        
        // Middle row (West, Actions, East)
        const middleRow = document.createElement('div');
        middleRow.className = 'nav-row';
        
        // West
        const westExits = nav.exits.filter(e => e.direction === 'west' && (!e.condition || e.condition()));
        if (westExits.length > 0) {
            westExits.forEach(exit => {
                const btn = document.createElement('button');
                btn.className = 'nav-btn nav-west';
                btn.textContent = exit.label;
                btn.onclick = () => this.enterLocation(exit.target);
                middleRow.appendChild(btn);
            });
        } else {
            const spacer = document.createElement('div');
            spacer.className = 'nav-btn-placeholder';
            middleRow.appendChild(spacer);
        }
        
        // East
        const eastExits = nav.exits.filter(e => e.direction === 'east' && (!e.condition || e.condition()));
        if (eastExits.length > 0) {
            eastExits.forEach(exit => {
                const btn = document.createElement('button');
                btn.className = 'nav-btn nav-east';
                btn.textContent = exit.label;
                btn.onclick = () => this.enterLocation(exit.target);
                middleRow.appendChild(btn);
            });
        } else {
            const spacer = document.createElement('div');
            spacer.className = 'nav-btn-placeholder';
            middleRow.appendChild(spacer);
        }
        
        panel.appendChild(middleRow);
        
        // South exits
        const southExits = nav.exits.filter(e => e.direction === 'south' && (!e.condition || e.condition()));
        if (southExits.length > 0) {
            const southRow = document.createElement('div');
            southRow.className = 'nav-row';
            southExits.forEach(exit => {
                const btn = document.createElement('button');
                btn.className = 'nav-btn nav-south';
                btn.textContent = exit.label;
                btn.onclick = () => this.enterLocation(exit.target);
                southRow.appendChild(btn);
            });
            panel.appendChild(southRow);
        }
        
        // Enter/Exit buttons (buildings)
        const enterExits = nav.exits.filter(e => (e.direction === 'enter' || e.direction === 'exit') && (!e.condition || e.condition()));
        if (enterExits.length > 0) {
            const enterRow = document.createElement('div');
            enterRow.className = 'nav-row';
            enterRow.style.flexWrap = 'wrap';
            enterRow.style.justifyContent = 'center';
            enterRow.style.maxWidth = '450px';
            enterExits.forEach(exit => {
                const btn = document.createElement('button');
                btn.className = 'nav-btn nav-enter';
                btn.textContent = exit.label;
                btn.onclick = () => this.enterLocation(exit.target);
                enterRow.appendChild(btn);
            });
            panel.appendChild(enterRow);
        }
        
        // Interactions (NPCs, objects)
        const interactions = nav.interactions.filter(i => !i.condition || i.condition());
        if (interactions.length > 0) {
            const interactRow = document.createElement('div');
            interactRow.className = 'nav-row';
            interactRow.style.flexWrap = 'wrap';
            interactRow.style.justifyContent = 'center';
            interactRow.style.maxWidth = '500px';
            interactRow.style.marginTop = '5px';
            
            interactions.forEach(inter => {
                // Check if item already picked or container opened
                if (inter.action === 'pickup' && this.pickedItems.has(inter.target)) return;
                if (inter.action === 'container' && this.openedContainers.has(inter.target)) return;
                
                const btn = document.createElement('button');
                btn.className = 'nav-btn nav-interact';
                btn.textContent = inter.label;
                btn.onclick = () => this.handleInteraction(inter);
                interactRow.appendChild(btn);
            });
            
            if (interactRow.children.length > 0) {
                panel.appendChild(interactRow);
            }
        }
    },
    
    handleInteraction(interaction) {
        switch (interaction.action) {
            case 'talk':
                Dialog.start(interaction.target);
                break;
            case 'goto':
                // Direct scene change
                this.loadScene(interaction.target);
                break;
            case 'examine':
                const examineObj = this.currentScene.objects.find(o => o.id === interaction.target);
                if (examineObj) {
                    this.examineObject(examineObj);
                }
                break;
            case 'pickup':
                const itemObj = this.currentScene.objects.find(o => o.id === interaction.target);
                if (itemObj) {
                    this.pickupItem(itemObj);
                    this.updateNavigation();
                }
                break;
            case 'container':
                const containerObj = this.currentScene.objects.find(o => o.id === interaction.target);
                if (containerObj) {
                    this.openContainer(containerObj);
                    this.updateNavigation();
                }
                break;
            case 'fight':
                const enemyObj = this.currentScene.objects.find(o => o.id === interaction.target);
                if (enemyObj && enemyObj.enemyId) {
                    Combat.start(enemyObj.enemyId, interaction.target);
                }
                break;
            case 'mine':
                // Mining ore
                Player.flags[interaction.target + '_mined'] = true;
                let oreAmount = 3; // Default amount
                if (interaction.target === 'ore3') oreAmount = 5; // Rich vein
                Player.addItem('iron_ore', oreAmount);
                
                // Update quest progress
                const mineQuest = Player.activeQuests.find(q => q.id === 'mine');
                if (mineQuest) {
                    const totalOre = Player.inventory.find(i => i.itemId === 'iron_ore');
                    mineQuest.progress = totalOre ? totalOre.quantity : 0;
                }
                
                Game.showNotification(`+${oreAmount} Eisenerz abgebaut!`);
                this.updateNavigation();
                break;
            case 'loot_body':
                // Looting the husband's body triggers bandit attack
                Player.flags.looted_husband = true;
                Player.addGold(20);
                Player.addItem('husband_amulet', 1);
                Game.showNotification('Du findest 20 Gold und ein Amulett...');
                
                // Bandit appears!
                setTimeout(() => {
                    Game.showExamineText('???', '*Eine Stimme hinter dir* Hey! Das ist MEIN Opfer! Ich hab den Kerl gerade erst erledigt und wollte ihn ausrauben - und dann kommst du daher?! Jetzt stirbst auch du!', () => {
                        Combat.start('bandit', 'forest_bandit');
                        Player.flags.found_husband_body = true;
                    });
                }, 1000);
                this.updateNavigation();
                break;
            case 'loot_road_body':
                // Looting the dead merchant on the road
                Player.flags.looted_road_merchant = true;
                Player.addGold(15);
                // 10% chance for gold ring
                if (Math.random() < 0.1) {
                    Player.addItem('gold_ring', 1);
                    Game.showNotification('Du findest 15 Gold und einen goldenen Ring!');
                } else {
                    Game.showNotification('Du findest 15 Gold.');
                }
                this.updateNavigation();
                break;
            case 'pick_herb':
                // Picking moonflowers
                Player.flags[interaction.target + '_picked'] = true;
                let herbAmount = 3;
                Player.addItem('moonflower', herbAmount);
                
                // Update quest progress
                const herbQuest = Player.activeQuests.find(q => q.id === 'herbs');
                if (herbQuest) {
                    const totalHerbs = Player.inventory.find(i => i.itemId === 'moonflower');
                    herbQuest.progress = totalHerbs ? totalHerbs.quantity : 0;
                }
                
                Game.showNotification(`+${herbAmount} Mondblumenkraut gesammelt!`);
                this.updateNavigation();
                break;
        }
    },
    
    removeObjectFromScene(sceneId, objectId) {
        const scene = GameData.scenes[sceneId];
        if (scene) {
            scene.objects = scene.objects.filter(obj => obj.id !== objectId);
        }
    },
    
    addObjectToScene(sceneId, object) {
        const scene = GameData.scenes[sceneId];
        if (scene) {
            scene.objects.push(object);
        }
    }
};

// ==================== MAIN GAME CONTROLLER ====================
const Game = {
    init() {
        this.setupInventoryUI();
        this.setupTooltip();
        this.setupContextMenu();
        Player.recalculateStats();
        this.inventoryOpen = false;
    },
    
    toggleInventory() {
        this.inventoryOpen = !this.inventoryOpen;
        const panel = document.getElementById('inventory-expandable');
        const btn = document.getElementById('toggle-inventory');
        
        if (this.inventoryOpen) {
            panel.classList.add('open');
            btn.classList.add('active');
        } else {
            panel.classList.remove('open');
            btn.classList.remove('active');
        }
    },
    
    updateMiniEquipment() {
        const slots = {
            'mini-weapon': 'weapon',
            'mini-shield': 'shield',
            'mini-armor': 'armor'
        };
        
        const defaultIcons = {
            weapon: '🗡️',
            shield: '🛡️',
            armor: '🥋'
        };
        
        for (const [elementId, slot] of Object.entries(slots)) {
            const el = document.getElementById(elementId);
            if (!el) continue;
            
            const itemId = Player.equipment[slot];
            if (itemId) {
                const item = GameData.items[itemId];
                if (item) {
                    el.textContent = item.icon;
                    el.classList.remove('empty');
                    el.title = item.name;
                }
            } else {
                el.textContent = defaultIcons[slot];
                el.classList.add('empty');
                el.title = slot.charAt(0).toUpperCase() + slot.slice(1);
            }
        }
    },
    
    // Alias für Kompatibilität mit index.html
    startNewGame() {
        this.newGame();
    },
    
    newGame() {
        // Reset player to initial state
        Player.name = 'Wanderer';
        Player.level = 1;
        Player.xp = 0;
        Player.xpToNext = 50;
        Player.attributePoints = 0;
        
        // Reset base attributes
        Player.baseStrength = 5;
        Player.baseVitality = 5;
        Player.baseIntelligence = 5;
        Player.baseDexterity = 5;
        
        // Reset current attributes
        Player.strength = 5;
        Player.vitality = 5;
        Player.intelligence = 5;
        Player.dexterity = 5;
        
        // Reset resources - START WITH 1 HP (almost dead!)
        Player.health = 1;
        Player.maxHealth = 25;
        Player.mana = 15;
        Player.maxMana = 15;
        Player.stamina = 100;
        Player.maxStamina = 100;
        
        // Reset combat stats
        Player.damage = 1;
        Player.defense = 0;
        
        // Reset equipment
        Player.equipment = {
            weapon: null,
            shield: null,
            helmet: null,
            armor: null,
            pants: null,
            ring1: null,
            ring2: null,
            amulet: null
        };
        
        Player.inventory = [];
        Player.gold = 0;
        Player.activeQuests = [];
        Player.completedQuests = [];
        Player.flags = {};
        Player.killCounts = {};
        
        Player.recalculateStats();
        
        // Reset scene state
        SceneManager.pickedItems.clear();
        SceneManager.openedContainers.clear();
        
        // Reset awakening scene (re-add witness if removed)
        GameData.scenes['awakening'].objects = [
            { type: 'examine', id: 'severed_head', name: 'Abgeschlagener Kopf', x: 25, y: 55, width: 8, height: 10, examineText: 'Ein abgeschlagener Kopf liegt neben dir im Dreck. Die Augen sind noch offen... starr... leblos. Du kennst dieses Gesicht nicht. Oder doch? Du kannst dich an nichts erinnern.' },
            { type: 'examine', id: 'blood_pool', name: 'Blutlache', x: 35, y: 60, width: 12, height: 8, examineText: 'Eine große Blutlache. Ein Teil davon ist dein eigenes Blut... du hast eine vernarbte Wunde an der Brust. Aber wie kannst du noch leben?' },
            { type: 'examine', id: 'your_body', name: 'Dein Körper', x: 18, y: 50, width: 10, height: 15, examineText: 'Du betrachtest dich selbst. Zerrissene Kleidung, eine große Narbe auf der Brust wo das Schwert dich durchbohrt haben muss. Aber du atmest. Dein Herz schlägt. Wie ist das möglich?' },
            { type: 'npc', id: 'witness', name: 'Mann in der Ferne', x: 75, y: 35, width: 8, height: 18 }
        ];
        
        // Reset road scene enemies
        GameData.scenes['road_to_village'].objects = [
            { type: 'examine', id: 'dead_tree', name: 'Toter Baum', x: 10, y: 20, width: 12, height: 40, examineText: 'Ein kahler, toter Baum. Seine Äste greifen wie knochige Finger in den grauen Himmel.' },
            { type: 'examine', id: 'old_sign', name: 'Verwittertes Schild', x: 45, y: 45, width: 8, height: 12, examineText: '"Dunkelheim - 1 Meile" steht in verblasster Schrift auf dem Schild. Jemand hat mit Blut "KEHRT UM" darunter geschrieben.' },
            { type: 'enemy', id: 'spider1', name: 'Waldspinne', enemyId: 'forest_spider', x: 60, y: 50, width: 8, height: 8 },
            { type: 'enemy', id: 'spider2', name: 'Waldspinne', enemyId: 'forest_spider', x: 75, y: 35, width: 8, height: 8 }
        ];
        
        // Reset ALL NPC dialog states
        for (const npcId in GameData.npcs) {
            delete GameData.npcs[npcId].currentDialog;
        }
        
        // Hide menu, show game
        document.getElementById('main-menu').classList.add('hidden');
        document.getElementById('game-container').classList.remove('hidden');
        
        // Load awakening scene (intro)
        SceneManager.load('awakening');
        
        // Show intro text after scene loads
        setTimeout(() => {
            this.showIntroSequence();
        }, 800);
        
        // Update UI
        this.updateUI();
        this.updateInventoryUI();
    },
    
    showIntroSequence() {
        const introTexts = [
            { speaker: '???', text: '*Deine Augen öffnen sich langsam...*' },
            { speaker: '???', text: 'Kälte. Schmerz. Der metallische Geschmack von Blut in deinem Mund.' },
            { speaker: '???', text: 'Du liegst auf dem Boden. Neben dir... ein abgeschlagener Kopf.' },
            { speaker: '???', text: 'Wer bist du? Wo bist du? Du kannst dich an nichts erinnern...' },
            { speaker: '???', text: 'In der Ferne steht ein Mann. Er beobachtet dich mit weit aufgerissenen Augen.' }
        ];
        
        let currentIndex = 0;
        
        const showNext = () => {
            if (currentIndex < introTexts.length) {
                this.showExamineText(introTexts[currentIndex].speaker, introTexts[currentIndex].text, () => {
                    currentIndex++;
                    if (currentIndex < introTexts.length) {
                        setTimeout(showNext, 300);
                    }
                });
            }
        };
        
        showNext();
    },
    
    loadGame() {
        const saveData = localStorage.getItem('dunkelheim_save');
        if (!saveData) {
            this.showNotification('Kein Spielstand gefunden!');
            return;
        }
        
        try {
            const data = JSON.parse(saveData);
            
            // Restore player
            Object.assign(Player, data.player);
            
            // Recalculate stats based on loaded data
            Player.recalculateStats();
            
            // Restore scene state
            SceneManager.pickedItems = new Set(data.pickedItems || []);
            SceneManager.openedContainers = new Set(data.openedContainers || []);
            
            // Hide menu, show game
            document.getElementById('main-menu').classList.add('hidden');
            document.getElementById('game-container').classList.remove('hidden');
            
            // Load scene
            SceneManager.load(Player.currentScene);
            
            // Update UI
            this.updateUI();
            this.updateInventoryUI();
            
            this.showNotification('Spiel geladen!');
        } catch (e) {
            this.showNotification('Fehler beim Laden!');
            console.error(e);
        }
    },
    
    saveGame() {
        const saveData = {
            player: {
                name: Player.name,
                level: Player.level,
                xp: Player.xp,
                xpToNext: Player.xpToNext,
                attributePoints: Player.attributePoints,
                baseStrength: Player.baseStrength,
                baseVitality: Player.baseVitality,
                baseIntelligence: Player.baseIntelligence,
                baseDexterity: Player.baseDexterity,
                health: Player.health,
                maxHealth: Player.maxHealth,
                mana: Player.mana,
                maxMana: Player.maxMana,
                stamina: Player.stamina,
                maxStamina: Player.maxStamina,
                equipment: Player.equipment,
                inventory: Player.inventory,
                gold: Player.gold,
                currentScene: Player.currentScene,
                activeQuests: Player.activeQuests,
                completedQuests: Player.completedQuests,
                flags: Player.flags,
                killCounts: Player.killCounts
            },
            pickedItems: Array.from(SceneManager.pickedItems),
            openedContainers: Array.from(SceneManager.openedContainers)
        };
        
        localStorage.setItem('dunkelheim_save', JSON.stringify(saveData));
        this.showNotification('Spiel gespeichert!');
    },
    
    showOptions() {
        this.showNotification('Optionen kommen bald!');
    },
    
    openMenu() {
        document.getElementById('game-container').classList.add('hidden');
        document.getElementById('main-menu').classList.remove('hidden');
    },
    
    openCharacter() {
        document.getElementById('character-overlay').classList.add('active');
        this.updateCharacterScreen();
    },
    
    closeCharacter() {
        document.getElementById('character-overlay').classList.remove('active');
    },
    
    updateCharacterScreen() {
        // Update level display in header
        document.getElementById('char-name-display').textContent = Player.name;
        document.getElementById('char-level-text').textContent = `Stufe ${Player.level}`;
        document.getElementById('char-xp-value').textContent = Player.xp;
        document.getElementById('char-xp-next').textContent = Player.xpToNext;
        
        // Update attribute points display
        const pointsDisplay = document.getElementById('attribute-points-display');
        document.getElementById('available-points').textContent = Player.attributePoints;
        
        if (Player.attributePoints > 0) {
            pointsDisplay.classList.add('has-points');
        } else {
            pointsDisplay.classList.remove('has-points');
        }
        
        // Update attribute values
        document.getElementById('attr-strength').textContent = Player.baseStrength;
        document.getElementById('attr-vitality').textContent = Player.baseVitality;
        document.getElementById('attr-intelligence').textContent = Player.baseIntelligence;
        document.getElementById('attr-dexterity').textContent = Player.baseDexterity;
        
        // Show equipment bonuses
        const strBonus = Player.strength - Player.baseStrength;
        const vitBonus = Player.vitality - Player.baseVitality;
        const intBonus = Player.intelligence - Player.baseIntelligence;
        const dexBonus = Player.dexterity - Player.baseDexterity;
        
        document.getElementById('attr-strength-bonus').textContent = strBonus > 0 ? `(+${strBonus})` : '';
        document.getElementById('attr-vitality-bonus').textContent = vitBonus > 0 ? `(+${vitBonus})` : '';
        document.getElementById('attr-intelligence-bonus').textContent = intBonus > 0 ? `(+${intBonus})` : '';
        document.getElementById('attr-dexterity-bonus').textContent = dexBonus > 0 ? `(+${dexBonus})` : '';
        
        // Update attribute buttons
        const buttons = document.querySelectorAll('.attribute-btn');
        buttons.forEach(btn => btn.disabled = Player.attributePoints <= 0);
        
        // Update stats
        document.getElementById('stat-level').textContent = Player.level;
        document.getElementById('stat-health').textContent = `${Player.health}/${Player.maxHealth}`;
        document.getElementById('stat-mana').textContent = `${Player.mana}/${Player.maxMana}`;
        document.getElementById('stat-damage').textContent = Player.damage;
        document.getElementById('stat-defense').textContent = Player.defense;
        document.getElementById('stat-dexterity').textContent = Player.dexterity;
        
        // Update XP bar
        const xpPercent = (Player.xp / Player.xpToNext) * 100;
        document.getElementById('xp-bar-fill').style.width = xpPercent + '%';
        document.getElementById('xp-text').textContent = `${Player.xp} / ${Player.xpToNext}`;
        
        // Update equipment slots
        this.updateEquipmentSlots();
    },
    
    updateEquipmentSlots() {
        const slots = ['weapon', 'shield', 'helmet', 'armor', 'pants', 'ring1', 'ring2', 'amulet'];
        const defaultIcons = {
            weapon: '🗡️',
            shield: '🛡️',
            helmet: '🎩',
            armor: '🥋',
            pants: '👖',
            ring1: '💍',
            ring2: '💍',
            amulet: '📿'
        };
        
        slots.forEach(slot => {
            const slotEl = document.querySelector(`.equip-slot[data-slot="${slot}"]`);
            if (!slotEl) return;
            
            const iconEl = slotEl.querySelector('.equip-slot-icon');
            const itemId = Player.equipment[slot];
            
            if (itemId) {
                const item = GameData.items[itemId];
                if (item) {
                    iconEl.textContent = item.icon;
                    slotEl.classList.remove('empty');
                    slotEl.title = item.name;
                }
            } else {
                iconEl.textContent = defaultIcons[slot];
                slotEl.classList.add('empty');
                slotEl.title = '';
            }
        });
    },
    
    onEquipSlotClick(slot) {
        if (Player.equipment[slot]) {
            // Unequip
            Player.unequipItem(slot);
            this.updateCharacterScreen();
        }
    },
    
    spendPoint(attribute) {
        if (Player.spendAttributePoint(attribute)) {
            this.updateCharacterScreen();
        }
    },
    
    openQuests() {
        if (Player.activeQuests.length === 0) {
            this.showNotification('Keine aktiven Quests.');
        } else {
            const questNames = Player.activeQuests.map(q => q.name).join(', ');
            this.showNotification(`Quests: ${questNames}`);
        }
    },
    
    updateUI() {
        // Health
        const healthPercent = (Player.health / Player.maxHealth) * 100;
        document.getElementById('health-bar').style.width = healthPercent + '%';
        document.getElementById('health-value').textContent = `${Player.health}/${Player.maxHealth}`;
        
        // Mana
        const manaPercent = (Player.mana / Player.maxMana) * 100;
        document.getElementById('mana-bar').style.width = manaPercent + '%';
        document.getElementById('mana-value').textContent = `${Player.mana}/${Player.maxMana}`;
        
        // Player info
        document.getElementById('player-name').textContent = Player.name;
        document.getElementById('player-level').textContent = `Stufe ${Player.level}`;
        
        // Update gold in inventory panel
        const goldEl = document.getElementById('inventory-gold');
        if (goldEl) goldEl.textContent = Player.gold;
        
        // Inventory count
        const countEl = document.getElementById('inventory-count');
        if (countEl) {
            countEl.textContent = `${Player.inventory.length}/${Player.inventorySize}`;
        }
        
        // Mini equipment display
        this.updateMiniEquipment();
    },
    
    setupInventoryUI() {
        const container = document.getElementById('inventory-slots');
        container.innerHTML = '';
        
        for (let i = 0; i < Player.inventorySize; i++) {
            const slot = document.createElement('div');
            slot.className = 'inventory-slot empty';
            slot.dataset.index = i;
            
            // Desktop: hover for tooltip
            slot.addEventListener('mouseenter', (e) => this.showItemTooltip(e, i));
            slot.addEventListener('mouseleave', () => this.hideItemTooltip());
            slot.addEventListener('click', (e) => this.onInventoryClick(e, i));
            slot.addEventListener('contextmenu', (e) => this.onInventoryRightClick(e, i));
            
            // Mobile: long-press for tooltip (separate from click)
            let touchStartTime = 0;
            let touchMoved = false;
            
            slot.addEventListener('touchstart', (e) => {
                touchStartTime = Date.now();
                touchMoved = false;
            }, { passive: true });
            
            slot.addEventListener('touchmove', () => {
                touchMoved = true;
            }, { passive: true });
            
            slot.addEventListener('touchend', (e) => {
                const touchDuration = Date.now() - touchStartTime;
                
                if (touchMoved) return; // User was scrolling
                
                if (touchDuration >= 400) {
                    // Long press - show tooltip
                    e.preventDefault();
                    this.showItemTooltipMobile(i);
                }
                // Short tap - handled by click event
            });
            
            container.appendChild(slot);
        }
    },
    
    mobileTooltipVisible: false,
    
    showItemTooltipMobile(slotIndex) {
        if (slotIndex >= Player.inventory.length) return;
        
        const invItem = Player.inventory[slotIndex];
        const itemData = GameData.items[invItem.itemId];
        if (!itemData) return;
        
        // Remove any existing mobile tooltip
        const existing = document.getElementById('mobile-tooltip-overlay');
        if (existing) existing.remove();
        
        // Create overlay
        const overlay = document.createElement('div');
        overlay.id = 'mobile-tooltip-overlay';
        overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);z-index:9999;display:flex;align-items:center;justify-content:center;';
        
        // Create tooltip box
        let statsHtml = '';
        if (itemData.damage) statsHtml += `<div style="color:#4ade80;">+${itemData.damage} Schaden</div>`;
        if (itemData.defense) statsHtml += `<div style="color:#4ade80;">+${itemData.defense} Verteidigung</div>`;
        if (itemData.strength) statsHtml += `<div style="color:#4ade80;">+${itemData.strength} Stärke</div>`;
        if (itemData.vitality) statsHtml += `<div style="color:#4ade80;">+${itemData.vitality} Vitalität</div>`;
        if (itemData.intelligence) statsHtml += `<div style="color:#4ade80;">+${itemData.intelligence} Intelligenz</div>`;
        if (itemData.dexterity) statsHtml += `<div style="color:#4ade80;">+${itemData.dexterity} Geschick</div>`;
        if (itemData.healAmount) statsHtml += `<div style="color:#4ade80;">Heilt ${itemData.healAmount} Leben</div>`;
        if (itemData.manaAmount) statsHtml += `<div style="color:#4ade80;">Stellt ${itemData.manaAmount} Mana wieder her</div>`;
        if (itemData.two_handed) statsHtml += `<div style="color:#f87171;">Benötigt beide Hände</div>`;
        if (itemData.dexterity_scaling) statsHtml += `<div style="color:#4ade80;">Skaliert mit Geschick</div>`;
        statsHtml += `<div style="color:#888;margin-top:5px;">Wert: ${itemData.value} Gold</div>`;
        
        const tooltipBox = document.createElement('div');
        tooltipBox.style.cssText = 'background:#1a1a2e;border:2px solid #c9a227;border-radius:10px;padding:20px;max-width:280px;text-align:center;';
        tooltipBox.innerHTML = `
            <div style="font-size:20px;margin-bottom:5px;">${itemData.icon}</div>
            <div style="color:#c9a227;font-size:16px;font-weight:bold;margin-bottom:5px;">${itemData.name}</div>
            <div style="color:#888;font-size:12px;margin-bottom:10px;">${this.getItemTypeName(itemData.type)}</div>
            <div style="margin-bottom:10px;">${statsHtml}</div>
            <div style="color:#aaa;font-size:12px;font-style:italic;margin-bottom:15px;">${itemData.description}</div>
            <div style="padding:10px 20px;background:#8b0000;border-radius:5px;color:white;cursor:pointer;" id="close-tooltip-btn">SCHLIEßEN</div>
        `;
        
        overlay.appendChild(tooltipBox);
        document.body.appendChild(overlay);
        
        // Close on button click
        document.getElementById('close-tooltip-btn').addEventListener('click', () => {
            overlay.remove();
        });
        
        // Close on overlay click (outside tooltip)
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.remove();
            }
        });
    },
    
    updateInventoryUI() {
        const slots = document.querySelectorAll('.inventory-slot');
        
        slots.forEach((slot, index) => {
            slot.innerHTML = '';
            slot.className = 'inventory-slot';
            
            if (index < Player.inventory.length) {
                const invItem = Player.inventory[index];
                const itemData = GameData.items[invItem.itemId];
                
                if (itemData) {
                    const icon = document.createElement('div');
                    icon.className = `item-icon item-${itemData.type}`;
                    icon.textContent = itemData.icon;
                    slot.appendChild(icon);
                    
                    if (invItem.quantity > 1) {
                        const qty = document.createElement('div');
                        qty.className = 'item-quantity';
                        qty.textContent = invItem.quantity;
                        slot.appendChild(qty);
                    }
                }
            } else {
                slot.classList.add('empty');
            }
        });
    },
    
    setupTooltip() {
        // Tooltip follows mouse
        document.addEventListener('mousemove', (e) => {
            const tooltip = document.getElementById('item-tooltip');
            if (tooltip.classList.contains('active')) {
                tooltip.style.left = (e.clientX + 15) + 'px';
                tooltip.style.top = (e.clientY + 15) + 'px';
            }
        });
    },
    
    showItemTooltip(e, slotIndex) {
        if (slotIndex >= Player.inventory.length) return;
        
        const invItem = Player.inventory[slotIndex];
        const itemData = GameData.items[invItem.itemId];
        if (!itemData) return;
        
        const tooltip = document.getElementById('item-tooltip');
        tooltip.querySelector('.tooltip-name').textContent = itemData.name;
        tooltip.querySelector('.tooltip-type').textContent = this.getItemTypeName(itemData.type);
        
        let statsHtml = '';
        if (itemData.damage) statsHtml += `<div class="tooltip-stat stat-positive">+${itemData.damage} Schaden</div>`;
        if (itemData.defense) statsHtml += `<div class="tooltip-stat stat-positive">+${itemData.defense} Verteidigung</div>`;
        if (itemData.healAmount) statsHtml += `<div class="tooltip-stat stat-positive">Heilt ${itemData.healAmount} Leben</div>`;
        if (itemData.manaAmount) statsHtml += `<div class="tooltip-stat stat-positive">Stellt ${itemData.manaAmount} Mana wieder her</div>`;
        statsHtml += `<div class="tooltip-stat">Wert: ${itemData.value} Gold</div>`;
        tooltip.querySelector('.tooltip-stats').innerHTML = statsHtml;
        
        tooltip.querySelector('.tooltip-desc').textContent = itemData.description;
        
        tooltip.classList.add('active');
    },
    
    hideItemTooltip() {
        document.getElementById('item-tooltip').classList.remove('active');
    },
    
    getItemTypeName(type) {
        const types = {
            weapon: 'Waffe',
            armor: 'Rüstung',
            consumable: 'Verbrauchbar',
            quest: 'Quest-Item',
            misc: 'Verschiedenes'
        };
        return types[type] || type;
    },
    
    onInventoryClick(e, slotIndex) {
        // Hide tooltip when clicking
        document.getElementById('item-tooltip').classList.remove('active');
        
        if (slotIndex >= Player.inventory.length) return;
        
        const invItem = Player.inventory[slotIndex];
        const itemData = GameData.items[invItem.itemId];
        
        if (itemData.type === 'consumable') {
            Player.useItem(invItem.itemId);
            this.updateInventoryUI();
        } else if (itemData.slot) {
            // Equippable item - check if slot is ring and handle ring1/ring2
            if (itemData.slot === 'ring1') {
                // Try ring1 first, then ring2 if ring1 is full
                if (!Player.equipment.ring1) {
                    Player.equipItem(invItem.itemId);
                } else if (!Player.equipment.ring2) {
                    // Temporarily change slot to ring2
                    const originalSlot = itemData.slot;
                    itemData.slot = 'ring2';
                    Player.equipItem(invItem.itemId);
                    itemData.slot = originalSlot;
                } else {
                    Player.equipItem(invItem.itemId);
                }
            } else {
                Player.equipItem(invItem.itemId);
            }
            this.updateInventoryUI();
            if (document.getElementById('character-overlay').classList.contains('active')) {
                this.updateCharacterScreen();
            }
        }
    },
    
    onInventoryRightClick(e, slotIndex) {
        e.preventDefault();
        // Always hide tooltip when right-clicking
        document.getElementById('item-tooltip').classList.remove('active');
        
        if (slotIndex >= Player.inventory.length) return;
        
        this.showContextMenu(e.clientX, e.clientY, slotIndex);
    },
    
    setupContextMenu() {
        document.addEventListener('click', (e) => {
            document.getElementById('context-menu').classList.remove('active');
            // Also hide tooltip if clicking outside inventory
            if (!e.target.closest('.inventory-slot')) {
                document.getElementById('item-tooltip').classList.remove('active');
            }
        });
    },
    
    showContextMenu(x, y, slotIndex) {
        const menu = document.getElementById('context-menu');
        const invItem = Player.inventory[slotIndex];
        const itemData = GameData.items[invItem.itemId];
        
        menu.innerHTML = '';
        
        if (itemData.type === 'consumable') {
            const useOpt = document.createElement('div');
            useOpt.className = 'context-option';
            useOpt.textContent = 'Benutzen';
            useOpt.onclick = () => {
                Player.useItem(invItem.itemId);
                this.updateInventoryUI();
            };
            menu.appendChild(useOpt);
        }
        
        if (itemData.slot) {
            const equipOpt = document.createElement('div');
            equipOpt.className = 'context-option';
            equipOpt.textContent = 'Ausrüsten';
            equipOpt.onclick = () => {
                Player.equipItem(invItem.itemId);
                this.updateInventoryUI();
                if (document.getElementById('character-overlay').classList.contains('active')) {
                    this.updateCharacterScreen();
                }
            };
            menu.appendChild(equipOpt);
        }
        
        const dropOpt = document.createElement('div');
        dropOpt.className = 'context-option';
        dropOpt.textContent = 'Wegwerfen';
        dropOpt.onclick = () => {
            Player.removeItem(invItem.itemId, 1);
            this.updateInventoryUI();
            this.showNotification(`${itemData.name} weggeworfen.`);
        };
        menu.appendChild(dropOpt);
        
        menu.style.left = x + 'px';
        menu.style.top = y + 'px';
        menu.classList.add('active');
    },
    
    showNotification(text) {
        const notification = document.getElementById('notification');
        notification.textContent = text;
        notification.classList.add('active');
        
        setTimeout(() => {
            notification.classList.remove('active');
        }, 2000);
    },
    
    showExamineText(title, text, callback = null) {
        // Use the dialog system for examine text
        document.getElementById('dialog-overlay').classList.add('active');
        document.getElementById('dialog-speaker').textContent = title;
        document.getElementById('dialog-text').textContent = text;
        
        const optionsContainer = document.getElementById('dialog-options');
        optionsContainer.innerHTML = '';
        
        const btn = document.createElement('div');
        btn.className = 'dialog-option';
        btn.textContent = '[Weiter]';
        btn.onclick = () => {
            document.getElementById('dialog-overlay').classList.remove('active');
            if (callback) callback();
        };
        optionsContainer.appendChild(btn);
    },
    
    gameOver() {
        // Simple game over - return to menu
        setTimeout(() => {
            this.showNotification('Game Over');
            document.getElementById('main-menu').classList.remove('hidden');
        }, 1000);
    }
};

// ==================== INITIALIZE ====================
document.addEventListener('DOMContentLoaded', () => {
    Game.init();
    
    // Request fullscreen on first interaction
    const requestFullscreen = () => {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen().catch(() => {});
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
        // Remove listener after first use
        document.removeEventListener('click', requestFullscreen);
        document.removeEventListener('touchstart', requestFullscreen);
    };
    document.addEventListener('click', requestFullscreen, { once: true });
    document.addEventListener('touchstart', requestFullscreen, { once: true });
});
