// ==================== GAME DATA ====================
// Enthält alle Spieldaten: Items, Enemies, NPCs, Scenes
// Separate Datei für einfache Bearbeitung

const GameData = {
    // Item Database
    items: {
        // === WEAPONS ===
        'blunt_sword': {
            id: 'blunt_sword',
            name: 'Stumpfes Schwert',
            type: 'weapon',
            slot: 'weapon',
            icon: '🗡️',
            damage: 2,
            description: 'Ein altes, stumpfes Schwert. Die Klinge ist abgenutzt, aber es ist besser als nichts.',
            value: 5,
            stackable: false
        },
        'rusty_sword': {
            id: 'rusty_sword',
            name: 'Rostiges Schwert',
            type: 'weapon',
            slot: 'weapon',
            icon: '🗡️',
            damage: 5,
            description: 'Ein altes, verrostetes Schwert. Besser als ein stumpfes.',
            value: 15,
            stackable: false
        },
        'iron_sword': {
            id: 'iron_sword',
            name: 'Eisenschwert',
            type: 'weapon',
            slot: 'weapon',
            icon: '⚔️',
            damage: 10,
            description: 'Ein solides Eisenschwert.',
            value: 50,
            stackable: false
        },
        'sharp_sword': {
            id: 'sharp_sword',
            name: 'Scharfes Schwert',
            type: 'weapon',
            slot: 'weapon',
            icon: '⚔️',
            damage: 8,
            description: 'Dein stumpfes Schwert, nun vom Schmied geschärft. Viel effektiver!',
            value: 35,
            stackable: false
        },
        'hunting_bow': {
            id: 'hunting_bow',
            name: 'Jagdbogen',
            type: 'weapon',
            slot: 'weapon',
            icon: '🏹',
            damage: 10,
            dexterity_scaling: true,
            two_handed: true,
            requiredDex: 8,
            description: 'Ein robuster Jagdbogen. Schaden skaliert mit Geschick. Benötigt 8 Geschick.',
            value: 45,
            stackable: false
        },
        'bandit_dagger': {
            id: 'bandit_dagger',
            name: 'Banditen-Dolch',
            type: 'weapon',
            slot: 'weapon',
            icon: '🗡️',
            damage: 3,
            description: 'Ein billiger Dolch eines Banditen. Nicht viel wert.',
            value: 8,
            stackable: false
        },
        'short_sword': {
            id: 'short_sword',
            name: 'Kurzschwert',
            type: 'weapon',
            slot: 'weapon',
            icon: '🗡️',
            damage: 4,
            description: 'Ein leichtes Kurzschwert. Gut für Anfänger.',
            value: 30,
            stackable: false
        },
        'battle_axe': {
            id: 'battle_axe',
            name: 'Streitaxt',
            type: 'weapon',
            slot: 'weapon',
            icon: '🪓',
            damage: 9,
            requiredStr: 10,
            description: 'Eine schwere Streitaxt. Benötigt 10 Stärke.',
            value: 75,
            stackable: false
        },
        'steel_sword': {
            id: 'steel_sword',
            name: 'Stahlschwert',
            type: 'weapon',
            slot: 'weapon',
            icon: '⚔️',
            damage: 12,
            requiredStr: 12,
            description: 'Ein fein geschmiedetes Stahlschwert. Benötigt 12 Stärke.',
            value: 120,
            stackable: false
        },
        'grimms_blade': {
            id: 'grimms_blade',
            name: 'Grimms Klinge',
            type: 'weapon',
            slot: 'weapon',
            icon: '🗡️',
            damage: 11,
            dexterity: 2,
            requiredDex: 10,
            description: 'Das blutige Schwert des Schlächters. Benötigt 10 Geschick.',
            value: 100,
            stackable: false
        },
        'fortress_plans': {
            id: 'fortress_plans',
            name: 'Baupläne der Festung',
            type: 'quest',
            icon: '📜',
            description: 'Alte Baupläne der Festung Rabenfels. Zeigt einen geheimen Eingang durch die Minen.',
            value: 0,
            stackable: false
        },
        'healing_herbs': {
            id: 'healing_herbs',
            name: 'Gretas Heilkräuter',
            type: 'quest',
            icon: '🌿',
            description: 'Spezielle Heilkräuter von der Kräutersammlerin Greta. Können Marcus heilen.',
            value: 0,
            stackable: false
        },
        'wooden_shield': {
            id: 'wooden_shield',
            name: 'Holzschild',
            type: 'armor',
            slot: 'shield',
            icon: '🛡️',
            defense: 2,
            description: 'Ein einfacher Holzschild. Besser als nichts.',
            value: 20,
            stackable: false
        },
        'iron_shield': {
            id: 'iron_shield',
            name: 'Eisenschild',
            type: 'armor',
            slot: 'shield',
            icon: '🛡️',
            defense: 4,
            description: 'Ein robuster Eisenschild. Guter Schutz.',
            value: 40,
            stackable: false
        },
        'leather_armor': {
            id: 'leather_armor',
            name: 'Lederrüstung',
            type: 'armor',
            slot: 'armor',
            icon: '🦺',
            defense: 3,
            description: 'Leichte Lederrüstung. Beweglich und schützend.',
            value: 35,
            stackable: false
        },
        'chainmail': {
            id: 'chainmail',
            name: 'Kettenhemd',
            type: 'armor',
            slot: 'armor',
            icon: '🛡️',
            defense: 5,
            description: 'Ein Kettenhemd aus Eisenringen. Guter Schutz gegen Klingen.',
            value: 60,
            stackable: false
        },
        'plate_armor': {
            id: 'plate_armor',
            name: 'Plattenrüstung',
            type: 'armor',
            slot: 'armor',
            icon: '🛡️',
            defense: 8,
            vitality: 2,
            description: 'Schwere Plattenrüstung. Der beste Schutz den Gold kaufen kann.',
            value: 150,
            stackable: false
        },
        
        // === SHIELDS ===
        'wooden_shield': {
            id: 'wooden_shield',
            name: 'Holzschild',
            type: 'armor',
            slot: 'shield',
            icon: '🛡️',
            defense: 2,
            description: 'Ein einfacher Schild aus Holz.',
            value: 15,
            stackable: false
        },
        'iron_shield': {
            id: 'iron_shield',
            name: 'Eisenschild',
            type: 'armor',
            slot: 'shield',
            icon: '🛡️',
            defense: 5,
            vitality: 1,
            description: 'Ein stabiler Eisenschild.',
            value: 40,
            stackable: false
        },
        'reinforced_shield': {
            id: 'reinforced_shield',
            name: 'Verstärkter Schild',
            type: 'armor',
            slot: 'shield',
            icon: '🛡️',
            defense: 6,
            vitality: 2,
            description: 'Ein mit Stahl verstärkter Schild.',
            value: 80,
            stackable: false
        },
        
        // === HELMETS ===
        'leather_cap': {
            id: 'leather_cap',
            name: 'Lederkappe',
            type: 'armor',
            slot: 'helmet',
            icon: '🎩',
            defense: 1,
            description: 'Eine einfache Lederkappe.',
            value: 10,
            stackable: false
        },
        
        // === ARMOR ===
        'leather_armor': {
            id: 'leather_armor',
            name: 'Lederrüstung',
            type: 'armor',
            slot: 'armor',
            icon: '🥋',
            defense: 3,
            vitality: 1,
            description: 'Eine leichte Lederrüstung.',
            value: 25,
            stackable: false
        },
        
        // === PANTS ===
        'leather_pants': {
            id: 'leather_pants',
            name: 'Lederhose',
            type: 'armor',
            slot: 'pants',
            icon: '👖',
            defense: 1,
            dexterity: 1,
            description: 'Eine bequeme Lederhose.',
            value: 15,
            stackable: false
        },
        
        // === RINGS ===
        'ring_of_strength': {
            id: 'ring_of_strength',
            name: 'Ring der Stärke',
            type: 'accessory',
            slot: 'ring1',
            icon: '💍',
            strength: 2,
            description: 'Ein Ring der deine Stärke erhöht.',
            value: 50,
            stackable: false
        },
        'ring_of_vitality': {
            id: 'ring_of_vitality',
            name: 'Ring der Vitalität',
            type: 'accessory',
            slot: 'ring1',
            icon: '💍',
            vitality: 2,
            description: 'Ein Ring der deine Lebenskraft erhöht.',
            value: 50,
            stackable: false
        },
        'ring_of_speed': {
            id: 'ring_of_speed',
            name: 'Ring der Schnelligkeit',
            type: 'accessory',
            slot: 'ring1',
            icon: '💍',
            dexterity: 3,
            description: 'Ein Ring der dich schneller macht.',
            value: 60,
            stackable: false
        },
        
        // === AMULETS ===
        'amulet_of_protection': {
            id: 'amulet_of_protection',
            name: 'Amulett des Schutzes',
            type: 'accessory',
            slot: 'amulet',
            icon: '📿',
            defense: 2,
            vitality: 1,
            description: 'Ein magisches Amulett das dich schützt.',
            value: 75,
            stackable: false
        },
        
        // === CONSUMABLES ===
        'bread': {
            id: 'bread',
            name: 'Brot',
            type: 'consumable',
            icon: '🍞',
            healAmount: 10,
            description: 'Ein Laib Brot. Heilt 10 LP.',
            value: 5,
            stackable: true,
            maxStack: 20
        },
        'beer': {
            id: 'beer',
            name: 'Bier',
            type: 'consumable',
            icon: '🍺',
            healAmount: 5,
            isBeer: true,
            description: 'Ein kühles Bier. Heilt 5 LP. Trinke 5 Bier für +1 Mana dauerhaft!',
            value: 10,
            stackable: true,
            maxStack: 20
        },
        'cooked_meat': {
            id: 'cooked_meat',
            name: 'Gebratenes Fleisch',
            type: 'consumable',
            icon: '🍖',
            healAmount: 40,
            description: 'Leckeres gebratenes Fleisch. Heilt 40 LP.',
            value: 25,
            stackable: true,
            maxStack: 10
        },
        'smoked_fish': {
            id: 'smoked_fish',
            name: 'Geräucherter Fisch',
            type: 'consumable',
            icon: '🐟',
            healAmount: 25,
            description: 'Ein geräucherter Fisch. Heilt 25 LP.',
            value: 15,
            stackable: true,
            maxStack: 10
        },
        'health_potion': {
            id: 'health_potion',
            name: 'Heiltrank',
            type: 'consumable',
            icon: '🧪',
            healAmount: 30,
            description: 'Stellt 30 Lebenspunkte wieder her.',
            value: 25,
            stackable: true,
            maxStack: 10
        },
        'large_health_potion': {
            id: 'large_health_potion',
            name: 'Großer Heiltrank',
            type: 'consumable',
            icon: '🧪',
            healAmount: 60,
            description: 'Ein mächtiger Heiltrank der 60 LP heilt.',
            value: 50,
            stackable: true,
            maxStack: 10
        },
        'mana_potion': {
            id: 'mana_potion',
            name: 'Manatrank',
            type: 'consumable',
            icon: '💙',
            manaAmount: 25,
            description: 'Stellt 25 Manapunkte wieder her.',
            value: 30,
            stackable: true,
            maxStack: 10
        },
        'large_health_potion': {
            id: 'large_health_potion',
            name: 'Großer Heiltrank',
            type: 'consumable',
            icon: '🧪',
            healAmount: 60,
            description: 'Stellt 60 Lebenspunkte wieder her.',
            value: 50,
            stackable: true,
            maxStack: 10
        },
        
        // === MONSTER DROPS ===
        'spider_leg': {
            id: 'spider_leg',
            name: 'Spinnenbein',
            type: 'misc',
            icon: '🦵',
            description: 'Ein haariges Bein einer Spinne. Eklig, aber vielleicht nützlich.',
            value: 3,
            stackable: true,
            maxStack: 50
        },
        'giant_spider_leg': {
            id: 'giant_spider_leg',
            name: 'Großes Spinnenbein',
            type: 'misc',
            icon: '🦿',
            description: 'Ein massives Bein einer Riesenspinne. Sehr wertvoll.',
            value: 25,
            stackable: true,
            maxStack: 20
        },
        'spider_egg': {
            id: 'spider_egg',
            name: 'Spinnenei',
            type: 'misc',
            icon: '🥚',
            description: 'Ein klebriges Ei einer Spinne. Manche Alchemisten zahlen gut dafür.',
            value: 15,
            stackable: true,
            maxStack: 20
        },
        'poison_sac': {
            id: 'poison_sac',
            name: 'Giftsack',
            type: 'misc',
            icon: '☠️',
            description: 'Ein Giftsack einer Riesenspinne. Sehr gefährlich und wertvoll.',
            value: 40,
            stackable: true,
            maxStack: 10
        },
        'spider_silk': {
            id: 'spider_silk',
            name: 'Spinnenseide',
            type: 'misc',
            icon: '🧵',
            description: 'Feine, aber starke Seide. Wird für Rüstungen verwendet.',
            value: 20,
            stackable: true,
            maxStack: 30
        },
        'bone': {
            id: 'bone',
            name: 'Knochen',
            type: 'misc',
            icon: '🦴',
            description: 'Ein Knochen von unbekannter Herkunft.',
            value: 2,
            stackable: true,
            maxStack: 50
        },
        'rat_tail': {
            id: 'rat_tail',
            name: 'Rattenschwanz',
            type: 'misc',
            icon: '🐀',
            description: 'Ein ekliger Rattenschwanz.',
            value: 1,
            stackable: true,
            maxStack: 50
        },
        'rat_crown': {
            id: 'rat_crown',
            name: 'Rattenkrone',
            type: 'accessory',
            slot: 'helmet',
            icon: '👑',
            dexterity: 3,
            description: 'Eine seltsame Krone aus Knochen und Fell. Die Rattenkönigin trug sie. +3 Geschick.',
            value: 60,
            stackable: false
        },
        'wolf_pelt': {
            id: 'wolf_pelt',
            name: 'Wolfsfell',
            type: 'misc',
            icon: '🐺',
            description: 'Ein dickes Wolfsfell. Jäger zahlen gut dafür.',
            value: 20,
            stackable: true,
            maxStack: 20
        },
        'wolf_meat': {
            id: 'wolf_meat',
            name: 'Wolfsfleisch',
            type: 'consumable',
            icon: '🥩',
            healAmount: 15,
            description: 'Rohes Wolfsfleisch. Kann gegessen werden für 15 LP.',
            value: 8,
            stackable: true,
            maxStack: 20
        },
        'frog_leg': {
            id: 'frog_leg',
            name: 'Froschschenkel',
            type: 'consumable',
            icon: '🍗',
            healAmount: 10,
            description: 'Ein saftiger Froschschenkel. Heilt 10 LP.',
            value: 5,
            stackable: true,
            maxStack: 20
        },
        'lizard_scale': {
            id: 'lizard_scale',
            name: 'Eidechsenschuppe',
            type: 'misc',
            icon: '🦎',
            description: 'Eine schimmernde Schuppe einer Sumpfeidechse.',
            value: 6,
            stackable: true,
            maxStack: 30
        },
        'lizard_tail': {
            id: 'lizard_tail',
            name: 'Eidechsenschwanz',
            type: 'misc',
            icon: '🦎',
            description: 'Ein abgeworfener Eidechsenschwanz. Alchemisten zahlen gut dafür.',
            value: 12,
            stackable: true,
            maxStack: 20
        },
        'husband_amulet': {
            id: 'husband_amulet',
            name: 'Familien-Amulett',
            type: 'accessory',
            slot: 'amulet',
            icon: '📿',
            vitality: 2,
            description: 'Ein Amulett das einem toten Mann gehörte. +2 Vitalität.',
            value: 30,
            stackable: false
        },
        'strength_ring': {
            id: 'strength_ring',
            name: 'Ring der Stärke',
            type: 'accessory',
            slot: 'ring1',
            icon: '💍',
            strength: 2,
            description: 'Ein alter Ring der mit Macht erfüllt ist. +2 Stärke.',
            value: 40,
            stackable: false
        },
        'gold_ring': {
            id: 'gold_ring',
            name: 'Goldener Ring',
            type: 'misc',
            icon: '💍',
            description: 'Ein wertvoller goldener Ring. Hat keine magischen Kräfte, aber ist viel wert.',
            value: 100,
            stackable: false
        },
        'magic_ring': {
            id: 'magic_ring',
            name: 'Ring der Magie',
            type: 'accessory',
            slot: 'ring1',
            icon: '💍',
            intelligence: 3,
            description: 'Ein Ring der mit arkaner Energie pulsiert. +3 Intelligenz.',
            value: 80,
            stackable: false
        },
        'signet_ring': {
            id: 'signet_ring',
            name: 'Siegelring',
            type: 'quest',
            icon: '💍',
            description: 'Ein Ring mit einem Siegel. Er soll dir helfen Aldric in Steinwacht zu finden.',
            value: 0,
            stackable: false
        },
        'holy_symbol': {
            id: 'holy_symbol',
            name: 'Heiliges Symbol',
            type: 'quest',
            icon: '✝️',
            description: 'Ein heiliges Symbol aus der Kathedrale. Es gehört Elaras Familie.',
            value: 0,
            stackable: false
        },
        'merchant_goods': {
            id: 'merchant_goods',
            name: 'Gestohlene Waren',
            type: 'quest',
            icon: '📦',
            description: 'Die gestohlenen Waren des fahrenden Händlers Viktor.',
            value: 0,
            stackable: false
        },
        'large_health_potion': {
            id: 'large_health_potion',
            name: 'Großer Heiltrank',
            type: 'consumable',
            icon: '🧪',
            healAmount: 60,
            description: 'Ein mächtiger Heiltrank. Stellt 60 LP wieder her.',
            value: 50,
            stackable: true,
            maxStack: 5
        },
        
        // === QUEST ITEMS ===
        'old_key': {
            id: 'old_key',
            name: 'Alter Schlüssel',
            type: 'quest',
            icon: '🔑',
            description: 'Ein verwitterter Schlüssel. Wofür könnte er sein?',
            value: 0,
            stackable: false
        },
        'raw_meat': {
            id: 'raw_meat',
            name: 'Rohes Fleisch',
            type: 'quest',
            icon: '🥩',
            description: 'Frisches Fleisch vom Bauern. Der Wirt wartet darauf.',
            value: 50,
            stackable: true,
            maxStack: 10
        },
        'iron_ore': {
            id: 'iron_ore',
            name: 'Eisenerz',
            type: 'quest',
            icon: '🪨',
            description: 'Rohes Eisenerz aus der Mine. Der Schmied kann es verwenden.',
            value: 8,
            stackable: true,
            maxStack: 50
        },
        'moonflower': {
            id: 'moonflower',
            name: 'Mondblumenkraut',
            type: 'quest',
            icon: '🌸',
            description: 'Eine seltene Blume die nur nachts blüht. Kräuterfrauen zahlen gut dafür.',
            value: 15,
            stackable: true,
            maxStack: 20
        },
        'old_fishing_rod': {
            id: 'old_fishing_rod',
            name: 'Alte Angelrute',
            type: 'quest',
            icon: '🎣',
            description: 'Eine alte aber gut gepflegte Angelrute. Ein Erbstück.',
            value: 0,
            stackable: false
        },
        
        // === MISC ===
        'torch': {
            id: 'torch',
            name: 'Fackel',
            type: 'misc',
            icon: '🔥',
            description: 'Erhellt dunkle Orte.',
            value: 5,
            stackable: true,
            maxStack: 5
        },
        'gold_coin': {
            id: 'gold_coin',
            name: 'Goldmünze',
            type: 'misc',
            icon: '🪙',
            description: 'Eine glänzende Goldmünze.',
            value: 1,
            stackable: true,
            maxStack: 999
        }
    },
    
    // Enemy Database
    enemies: {
        'mini_spider': {
            id: 'mini_spider',
            name: 'Minispinne',
            icon: '🕷️',
            health: 8,
            damage: 2,
            defense: 0,
            dexterity: 2,
            xp: 4,
            gold: [0, 2],
            loot: []  // Droppt nichts
        },
        'forest_spider': {
            id: 'forest_spider',
            name: 'Waldspinne',
            icon: '🕷️',
            health: 12,
            damage: 3,
            defense: 0,
            dexterity: 3,
            xp: 8,
            gold: [2, 5],
            loot: [
                { itemId: 'spider_leg', chance: 1.0, quantity: [1, 2] },
                { itemId: 'spider_egg', chance: 0.20, quantity: [1, 1] }
            ]
        },
        'cave_spider': {
            id: 'cave_spider',
            name: 'Höhlenspinne',
            icon: '🕷️',
            health: 15,
            damage: 4,
            defense: 1,
            dexterity: 4,
            xp: 12,
            gold: [3, 7],
            loot: [
                { itemId: 'spider_leg', chance: 1.0, quantity: [1, 3] },
                { itemId: 'spider_egg', chance: 0.30, quantity: [1, 1] }
            ]
        },
        'giant_spider': {
            id: 'giant_spider',
            name: 'Riesenspinne',
            icon: '🕷️',
            health: 40,
            damage: 7,
            defense: 2,
            dexterity: 5,
            xp: 32,
            gold: [10, 20],
            loot: [
                { itemId: 'giant_spider_leg', chance: 1.0, quantity: [2, 4] },
                { itemId: 'poison_sac', chance: 0.60, quantity: [1, 1] },
                { itemId: 'spider_silk', chance: 0.30, quantity: [1, 2] }
            ]
        },
        'skeleton': {
            id: 'skeleton',
            name: 'Skelett',
            icon: '💀',
            health: 30,
            damage: 8,
            defense: 2,
            dexterity: 4,
            xp: 16,
            gold: [5, 15],
            loot: [
                { itemId: 'bone', chance: 1.0, quantity: [1, 3] },
                { itemId: 'old_key', chance: 0.10, quantity: [1, 1] }
            ]
        },
        'zombie': {
            id: 'zombie',
            name: 'Zombie',
            icon: '🧟',
            health: 45,
            damage: 12,
            defense: 1,
            dexterity: 2,
            xp: 20,
            gold: [3, 10],
            loot: [
                { itemId: 'bone', chance: 1.0, quantity: [1, 2] },
                { itemId: 'health_potion', chance: 0.15, quantity: [1, 1] }
            ]
        },
        'ghost': {
            id: 'ghost',
            name: 'Geist',
            icon: '👻',
            health: 25,
            damage: 15,
            defense: 5,
            dexterity: 8,
            xp: 28,
            gold: [10, 25],
            loot: [
                { itemId: 'mana_potion', chance: 0.40, quantity: [1, 1] }
            ]
        },
        'rat': {
            id: 'rat',
            name: 'Riesenratte',
            icon: '🐀',
            isAnimal: true,
            health: 10,
            damage: 3,
            defense: 0,
            dexterity: 6,
            xp: 4,
            gold: [1, 3],
            loot: [
                { itemId: 'rat_tail', chance: 1.0, quantity: [1, 1] }
            ]
        },
        'rat_queen': {
            id: 'rat_queen',
            name: 'Rattenkönigin',
            icon: '🐀',
            isAnimal: true,
            health: 45,
            damage: 8,
            defense: 2,
            dexterity: 7,
            xp: 44,
            gold: [20, 40],
            loot: [
                { itemId: 'rat_tail', chance: 1.0, quantity: [3, 5] },
                { itemId: 'rat_crown', chance: 1.0, quantity: [1, 1] }
            ]
        },
        'wolf': {
            id: 'wolf',
            name: 'Wolf',
            icon: '🐺',
            isAnimal: true,
            health: 25,
            damage: 5,
            defense: 1,
            dexterity: 5,
            xp: 16,
            gold: [0, 5],
            loot: [
                { itemId: 'wolf_pelt', chance: 1.0, quantity: [1, 1] },
                { itemId: 'wolf_meat', chance: 0.60, quantity: [1, 2] }
            ]
        },
        'bandit': {
            id: 'bandit',
            name: 'Bandit',
            icon: '🗡️',
            health: 55,
            damage: 12,
            defense: 3,
            dexterity: 5,
            xp: 40,
            gold: [15, 30],
            loot: [
                { itemId: 'bandit_dagger', chance: 1.0, quantity: [1, 1] },
                { itemId: 'health_potion', chance: 0.40, quantity: [1, 1] }
            ]
        },
        'giant_frog': {
            id: 'giant_frog',
            name: 'Riesenfrosch',
            icon: '🐸',
            isAnimal: true,
            health: 25,
            damage: 5,
            defense: 1,
            dexterity: 5,
            xp: 12,
            gold: [2, 8],
            loot: [
                { itemId: 'frog_leg', chance: 1.0, quantity: [1, 2] }
            ]
        },
        'swamp_lizard': {
            id: 'swamp_lizard',
            name: 'Sumpfeidechse',
            icon: '🦎',
            isAnimal: true,
            health: 22,
            damage: 6,
            defense: 1,
            dexterity: 6,
            xp: 14,
            gold: [3, 7],
            loot: [
                { itemId: 'lizard_scale', chance: 1.0, quantity: [1, 3] },
                { itemId: 'lizard_tail', chance: 0.40, quantity: [1, 1] }
            ]
        },
        'grimm_enemy': {
            id: 'grimm_enemy',
            name: 'Grimm der Schlächter',
            icon: '💀',
            health: 85,
            damage: 15,
            defense: 5,
            dexterity: 7,
            xp: 120,
            gold: [50, 80],
            loot: [
                { itemId: 'grimms_blade', chance: 1.0, quantity: [1, 1] },
                { itemId: 'large_health_potion', chance: 1.0, quantity: [2, 2] }
            ]
        }
    },
    
    // NPC Database
    npcs: {
        'witness': {
            id: 'witness',
            name: 'Zitternder Mann',
            icon: '👤',
            dialogs: {
                'default': {
                    text: '*Der Mann weicht erschrocken zurück* B-bei den Göttern! Du... du lebst?! Das ist unmöglich! Ich habe gesehen wie sie dich... wie das Schwert durch deine Brust...',
                    options: [
                        { text: 'Was ist passiert? Ich kann mich an nichts erinnern...', next: 'explanation' },
                        { text: 'Wer bin ich?', next: 'identity' },
                        { text: '*Schweigen*', next: 'explanation' }
                    ]
                },
                'identity': {
                    text: '*schüttelt den Kopf* Ich weiß nicht wer ihr seid, Fremder. Ich sah euch und den anderen auf der Straße. Ihr wurdet von Banditen überfallen... drei Männer in schwarzen Kapuzen.',
                    options: [
                        { text: 'Erzähl mir was du gesehen hast.', next: 'explanation' }
                    ]
                },
                'explanation': {
                    text: '*schluckt schwer* Ich hab mich im Gebüsch versteckt. Die Banditen... sie haben erst dem anderen den Kopf abgeschlagen. Dann haben sie euch durchbohrt und sind geflohen. Das war vor Stunden... ihr wart tot. Ich schwöre es, ihr wart tot!',
                    options: [
                        { text: 'Aber ich lebe...', next: 'miracle' },
                        { text: 'Wo sind die Banditen hin?', next: 'bandits' }
                    ]
                },
                'miracle': {
                    text: '*bekreuzigt sich* Ein Wunder... oder ein Fluch. In diesen dunklen Zeiten weiß man nie. *mustert dich misstrauisch* Ihr seht... anders aus. Eure Augen...',
                    options: [
                        { text: 'Ich muss weiter. Wo ist das nächste Dorf?', next: 'help' },
                        { text: 'Was meinst du mit meinen Augen?', next: 'eyes' }
                    ]
                },
                'bandits': {
                    text: 'Richtung Norden, zu den alten Ruinen. Dort hausen sie wohl. Aber geht da nicht hin! Diese Gegend ist verflucht genug.',
                    options: [
                        { text: 'Ich brauche Ausrüstung. Kannst du mir helfen?', next: 'help' }
                    ]
                },
                'eyes': {
                    text: '*weicht weiter zurück* Sie... sie schimmern seltsam. Fast wie... nein, vergesst es. Vielleicht bilde ich es mir ein. *reibt sich die Augen*',
                    options: [
                        { text: 'Ich muss weiter. Kannst du mir helfen?', next: 'help' }
                    ]
                },
                'help': {
                    text: '*seufzt* Ihr seht aus als hättet ihr nichts. Hier... *kramt in seinem Beutel* ...ein altes Brot und ein Schwert. Das Schwert ist stumpf, aber besser als nichts. Dunkelheim liegt östlich von hier. Seid vorsichtig.',
                    options: [
                        { text: '[Brot und Stumpfes Schwert nehmen]', next: 'farewell', action: 'give_starting_items' }
                    ]
                },
                'farewell': {
                    text: 'Mögen die Götter über euch wachen... wer auch immer ihr seid. *wendet sich ab* Ich muss hier weg. Diese Gegend gibt mir die Krätz...',
                    options: [
                        { text: 'Danke. Leb wohl.', next: null, action: 'witness_leaves' },
                        { text: '*Nicken*', next: null, action: 'witness_leaves' }
                    ]
                }
            }
        },
        'innkeeper_daughter': {
            id: 'innkeeper_daughter',
            name: 'Lina (Wirtstochter)',
            icon: '👧',
            dialogs: {
                'default': {
                    text: '*erschrickt* Bei den Göttern, wie seht Ihr denn aus?! Ihr seid ja völlig zerstört! Kommt schnell mit, mein Vater hat eine Taverne. Da könnt Ihr Euch erstmal waschen!',
                    options: [
                        { text: 'Danke... das ist sehr freundlich.', next: null, action: 'go_to_tavern' },
                        { text: '*Nicken und mitgehen*', next: null, action: 'go_to_tavern' }
                    ]
                },
                'after_tavern': {
                    text: 'Geht es Euch besser? Mein Vater ist drinnen, er kann Euch sicher helfen.',
                    options: [
                        { text: 'Ja, danke.', next: null }
                    ]
                }
            }
        },
        'innkeeper': {
            id: 'innkeeper',
            name: 'Bertram der Wirt',
            icon: '🧔',
            dialogs: {
                'default': {
                    text: '*mustert dich von oben bis unten* Meine Tochter hat mir schon von Euch erzählt. Ihr seht wirklich schlimm aus. Geht Euch erstmal waschen, danach reden wir.',
                    options: [
                        { text: '[Waschen gehen]', next: 'after_wash', action: 'wash_and_heal' }
                    ]
                },
                'first_meeting': {
                    text: '*mustert dich von oben bis unten* Meine Tochter hat mir schon von Euch erzählt. Ihr seht wirklich schlimm aus. Geht Euch erstmal waschen, danach reden wir.',
                    options: [
                        { text: '[Waschen gehen]', next: 'after_wash', action: 'wash_and_heal' }
                    ]
                },
                'after_wash': {
                    text: 'So ist es besser. Hört zu, Fremder - Ihr könnt hier gerne eine Nacht bleiben, aber umsonst ist das nicht. Erledigt ein paar Aufgaben für mich.',
                    options: [
                        { text: 'Was soll ich tun?', next: 'first_quest' },
                        { text: 'Ich habe kein Geld...', next: 'first_quest' }
                    ]
                },
                'first_quest': {
                    text: '*drückt dir einen Beutel mit Gold in die Hand* Hier sind 60 Gold. Geht zum Bauern Hendrik am östlichen Dorfrand und besorgt mir Fleisch. Er verlangt 50 Gold dafür. Die restlichen 10 könnt Ihr behalten.',
                    options: [
                        { text: '[60 Gold annehmen] Wird erledigt.', next: null, action: 'start_meat_quest' }
                    ]
                },
                'waiting_for_meat': {
                    text: 'Habt Ihr das Fleisch vom Bauern? Er ist am östlichen Dorfrand.',
                    options: [
                        { text: '[Fleisch abgeben]', next: 'meat_delivered', action: 'deliver_meat', condition: () => Player.hasItem('raw_meat') },
                        { text: 'Ich möchte etwas kaufen.', next: 'shop_menu' },
                        { text: 'Noch nicht, ich bin noch dabei.', next: null }
                    ]
                },
                'meat_delivered': {
                    text: '*nimmt das Fleisch entgegen* Ausgezeichnet! Ihr seid zuverlässig. Seht Euch ruhig im Dorf um - der Schmied könnte vielleicht Hilfe brauchen. Kommt später wieder, ich habe noch eine Aufgabe.',
                    options: [
                        { text: 'Danke. Ich sehe mich um.', next: null, action: 'complete_meat_quest' }
                    ]
                },
                'after_meat_quest': {
                    text: 'Ah, da seid Ihr wieder. Habt Ihr Euch schon beim Schmied umgesehen? Er hat bestimmt Arbeit für einen kräftigen Wanderer. Oder wollt Ihr etwas essen oder trinken?',
                    options: [
                        { text: 'Ich möchte etwas kaufen.', next: 'shop_menu' },
                        { text: 'Ja, ich kümmere mich darum.', next: null }
                    ]
                },
                'cellar_quest_available': {
                    text: '*sieht besorgt aus* Gut, dass Ihr da seid! Seit ein paar Tagen höre ich seltsame Geräusche aus meinem Keller. Ratten... oder schlimmeres. Ich traue mich nicht mehr runter. Könnt Ihr nachsehen?',
                    options: [
                        { text: 'Ich schaue mir das an.', next: null, action: 'start_cellar_quest' },
                        { text: 'Was bekomme ich dafür?', next: 'cellar_reward' },
                        { text: 'Vielleicht später.', next: 'shop_menu' }
                    ]
                },
                'cellar_reward': {
                    text: 'Ich gebe Euch freie Kost und Logis für eine Woche - das sind locker 100 Gold wert! Und natürlich ein paar Tränke für den Kampf.',
                    options: [
                        { text: 'In Ordnung, ich mache es.', next: null, action: 'start_cellar_quest' },
                        { text: 'Vielleicht später.', next: 'shop_menu' }
                    ]
                },
                'waiting_cellar': {
                    text: 'Habt Ihr die Kreaturen im Keller erledigt? Der Eingang ist hinten durch die Küche.',
                    options: [
                        { text: '[Keller ist sicher]', next: 'cellar_done', condition: () => Player.flags.cellar_cleared, action: 'complete_cellar_quest' },
                        { text: 'Ich bin noch dabei.', next: null },
                        { text: 'Ich möchte etwas kaufen.', next: 'shop_menu' }
                    ]
                },
                'cellar_done': {
                    text: '*atmet erleichtert auf* Endlich! Ich wusste nicht was da unten war, aber es klang furchtbar. Hier, wie versprochen - Tränke und Ihr könnt jederzeit hier kostenlos essen und schlafen!',
                    options: [
                        { text: '[Belohnung annehmen] Danke!', next: null, action: 'cellar_reward_receive' }
                    ]
                },
                'after_cellar_quest': {
                    text: '*lächelt breit* Mein Held! Setzt Euch, esst und trinkt was Ihr wollt - geht aufs Haus! Und wenn Ihr müde seid, habe ich ein Zimmer für Euch.',
                    options: [
                        { text: 'Kostenloses Bier!', next: 'free_beer', action: 'free_beer' },
                        { text: 'Kostenloses Essen!', next: 'free_food', action: 'free_food' },
                        { text: '[Schlafen gehen]', next: 'sleep', action: 'sleep_tavern' },
                        { text: 'Was wisst Ihr über die Dunkelheit?', next: 'lore_darkness' },
                        { text: 'Danke, vielleicht später.', next: null }
                    ]
                },
                'lore_darkness': {
                    text: '*seufzt schwer* Vor zwei Jahren war hier alles noch friedlich. Der König regierte gerecht, die Straßen waren sicher... Dann kam die Dunkelheit. *senkt die Stimme* Man sagt, ein mächtiger Totenbeschwörer hat den König und alle seine Berater in einer einzigen Nacht getötet. Mit einer Armee aus... Toten.',
                    options: [
                        { text: 'Ein Totenbeschwörer?', next: 'lore_necromancer' },
                        { text: 'Das klingt furchtbar...', next: null }
                    ]
                },
                'lore_necromancer': {
                    text: '*flüstert* Niemand kennt seinen Namen. Manche nennen ihn den "Schattenfürst". Er soll in einer Festung im Norden residieren, bewacht von seinen untoten Legionen. Seit er die Macht ergriffen hat, erscheinen überall Monster. *schaut sich um* In der Stadt Grauenfels weiß man vielleicht mehr - sie liegt östlich von hier.',
                    options: [
                        { text: 'Wie komme ich nach Grauenfels?', next: 'directions_city' },
                        { text: 'Danke für die Information.', next: null }
                    ]
                },
                'directions_city': {
                    text: 'Geht zum westlichen Dorfausgang, wo Ihr hergekommen seid. Der Weg nach Grauenfels führt nach Süden. Aber seid vorsichtig - Banditen treiben sich auf den Straßen herum. Ohne den König gibt es keine Wachen mehr.',
                    options: [
                        { text: 'Ich werde vorsichtig sein.', next: null, action: 'unlock_city_path' },
                        { text: 'Danke.', next: null, action: 'unlock_city_path' }
                    ]
                },
                'sleep': {
                    text: '*führt dich zu einem kleinen aber sauberen Zimmer* Ruht Euch aus. Ihr seht erschöpft aus... Übrigens, wenn Ihr Antworten sucht - in der Stadt Grauenfels im Osten gibt es vielleicht jemanden der Euch helfen kann. Die Straße führt vom westlichen Dorfausgang nach Süden.',
                    options: [
                        { text: '[Schlafen - LP und Mana auffüllen]', next: null, action: 'sleep_and_unlock' }
                    ]
                },
                'free_beer': {
                    text: '*zapft ein frisches Bier* Prost! Auf den Helden von Dunkelheim!',
                    options: [
                        { text: 'Noch eins!', next: 'free_beer', action: 'free_beer' },
                        { text: 'Etwas essen.', next: 'free_food', action: 'free_food' },
                        { text: '[Schlafen gehen]', next: 'sleep', action: 'sleep_tavern' },
                        { text: 'Danke, das reicht.', next: null }
                    ]
                },
                'free_food': {
                    text: '*bringt einen Teller mit dampfendem Fleisch* Lasst es Euch schmecken!',
                    options: [
                        { text: 'Noch etwas Bier.', next: 'free_beer', action: 'free_beer' },
                        { text: 'Danke, das reicht.', next: null }
                    ]
                },
                'shop_menu': {
                    text: () => `Was darf es sein? (Euer Gold: ${Player.gold})`,
                    options: [
                        { text: 'Bier (10 Gold) - Heilt 5 LP', next: 'shop_menu', action: 'buy_beer_shop' },
                        { text: 'Brot (10 Gold) - Heilt 10 LP', next: 'shop_menu', action: 'buy_bread_shop' },
                        { text: 'Fleisch (25 Gold) - Heilt 40 LP', next: 'shop_menu', action: 'buy_meat_shop', condition: () => Player.flags.meat_quest_done },
                        { text: '[Verkaufen]', next: 'sell_menu' },
                        { text: 'Nichts, danke.', next: null }
                    ]
                },
                'sell_menu': {
                    text: () => `Was wollt Ihr verkaufen? (Euer Gold: ${Player.gold})`,
                    options: [
                        { text: 'Froschschenkel (3 Gold)', next: 'sell_menu', action: 'sell_frog_leg', condition: () => Player.hasItem('frog_leg') },
                        { text: 'Wolfsfleisch (5 Gold)', next: 'sell_menu', action: 'sell_wolf_meat', condition: () => Player.hasItem('wolf_meat') },
                        { text: 'Rattenschwanz (1 Gold)', next: 'sell_menu', action: 'sell_rat_tail', condition: () => Player.hasItem('rat_tail') },
                        { text: 'Zurück zum Kaufen', next: 'shop_menu' },
                        { text: 'Nichts.', next: null }
                    ]
                },
                'sold_item': {
                    text: '*nimmt die Ware* Danke, hier ist Euer Gold.',
                    options: [
                        { text: 'Noch etwas verkaufen.', next: 'sell_menu' },
                        { text: 'Etwas kaufen.', next: 'shop_menu' },
                        { text: 'Danke.', next: null }
                    ]
                },
                'bought_beer': {
                    text: '*schenkt dir ein Bier ein* Prost! Das stärkt die Knochen.',
                    options: [
                        { text: 'Noch etwas kaufen.', next: 'shop_menu' },
                        { text: 'Danke.', next: null }
                    ]
                },
                'bought_bread': {
                    text: '*gibt dir ein Laib Brot* Frisch gebacken heute Morgen.',
                    options: [
                        { text: 'Noch etwas kaufen.', next: 'shop_menu' },
                        { text: 'Danke.', next: null }
                    ]
                },
                'bought_food': {
                    text: '*gibt dir einen Teller mit gebratenem Fleisch* Das beste im Dorf!',
                    options: [
                        { text: 'Noch etwas kaufen.', next: 'shop_menu' },
                        { text: 'Danke.', next: null }
                    ]
                }
            }
        },
        'farmer': {
            id: 'farmer',
            name: 'Bauer Hendrik',
            icon: '👨‍🌾',
            dialogs: {
                'default': {
                    text: '*wischt sich den Schweiß von der Stirn* Was wollt Ihr? Wenn Ihr wegen dem Fleisch für den Wirt seid, kostet das 50 Gold. *seufzt* Früher hätte ich das für 30 verkauft, aber seit die Monster kamen verliere ich ständig Vieh...',
                    options: [
                        { text: '[50 Gold bezahlen] Hier ist das Geld.', next: 'buy_meat', action: 'buy_meat', condition: () => Player.gold >= 50 },
                        { text: 'Ich habe nicht genug Gold.', next: 'no_money' },
                        { text: 'Was für Monster?', next: 'monsters_talk' },
                        { text: 'Braucht Ihr sonst Hilfe?', next: 'cow_quest', condition: () => !Player.flags.cow_quest_started && !Player.flags.cow_quest_done }
                    ]
                },
                'monsters_talk': {
                    text: '*spuckt aus* Wölfe die keine Angst vor Feuer haben, Spinnen so groß wie Hunde... Vor zwei Jahren gab es sowas nicht! Dann starb der König und alles ging bergab. *murmelt* Man sagt ein dunkler Zauberer steckt dahinter...',
                    options: [
                        { text: 'Ein dunkler Zauberer?', next: 'necromancer_rumor' },
                        { text: 'Braucht Ihr Hilfe?', next: 'cow_quest', condition: () => !Player.flags.cow_quest_started && !Player.flags.cow_quest_done },
                        { text: 'Verstehe...', next: null }
                    ]
                },
                'necromancer_rumor': {
                    text: '*senkt die Stimme* Ein Totenbeschwörer, heißt es. Hat den König und den ganzen Hofstaat in einer Nacht ermordet. Mit einer Armee aus Leichen! Seitdem regiert das Chaos. Keine Wachen, keine Gesetze... nur Monster und Banditen.',
                    options: [
                        { text: 'Das klingt schrecklich.', next: null },
                        { text: 'Braucht Ihr Hilfe?', next: 'cow_quest', condition: () => !Player.flags.cow_quest_started && !Player.flags.cow_quest_done }
                    ]
                },
                'no_money': {
                    text: 'Dann kommt wieder wenn Ihr es habt. Ich verschenke nichts - kann mir das nicht leisten in diesen Zeiten.',
                    options: [
                        { text: 'Verstanden.', next: null }
                    ]
                },
                'buy_meat': {
                    text: '*nimmt das Gold und gibt dir ein Paket Fleisch* Hier, frisch vom Morgen. Sagt dem Wirt einen Gruß.',
                    options: [
                        { text: 'Danke. Braucht Ihr sonst Hilfe?', next: 'cow_quest', condition: () => !Player.flags.cow_quest_started && !Player.flags.cow_quest_done },
                        { text: 'Danke.', next: null }
                    ]
                },
                'cow_quest': {
                    text: '*seufzt* Tatsächlich ja... Eine meiner Kühe ist weggelaufen. Irgendwo im Westen, Richtung Sumpf. Wenn Ihr sie findet, gebe ich Euch 2 Laibe Brot.',
                    options: [
                        { text: 'Ich halte die Augen offen.', next: null, action: 'start_cow_quest' },
                        { text: 'Vielleicht später.', next: null }
                    ]
                },
                'waiting_for_cow': {
                    text: 'Habt Ihr meine Kuh gefunden? Sie muss irgendwo im westlichen Sumpf sein.',
                    options: [
                        { text: '[Die schlechte Nachricht überbringen]', next: 'cow_dead', condition: () => Player.flags.saw_dead_cow },
                        { text: 'Noch nicht, ich suche weiter.', next: null }
                    ]
                },
                'cow_dead': {
                    text: '*sein Gesicht wird blass* Tot? Von Wölfen gefressen? *seufzt tief* Das war meine beste Milchkuh... Verdammte Bestien! Trotzdem... danke dass Ihr es mir gesagt habt. Hier, das Brot habt Ihr verdient.',
                    options: [
                        { text: '[Brot nehmen] Es tut mir leid.', next: null, action: 'complete_cow_quest' }
                    ]
                },
                'after_cow_quest': {
                    text: '*arbeitet auf dem Feld* Danke nochmal für die Information über meine Kuh. Ruhe in Frieden, Berta...',
                    options: [
                        { text: '[Fleisch kaufen - 50 Gold]', next: 'buy_meat', action: 'buy_meat', condition: () => Player.gold >= 50 },
                        { text: 'Auf Wiedersehen.', next: null }
                    ]
                }
            }
        },
        'blacksmith': {
            id: 'blacksmith',
            name: 'Schmied Torvan',
            icon: '👨‍🔧',
            dialogs: {
                'default': {
                    text: '*hämmert auf Metall* Was willst du? Die Zeiten sind hart, aber ich verkaufe noch.',
                    options: [
                        { text: 'Ich habe gehört Ihr hättet Arbeit?', next: 'work_question' },
                        { text: 'Was hast du anzubieten?', next: null, action: 'open_blacksmith_shop' },
                        { text: 'Nichts, danke.', next: null }
                    ]
                },
                'work_question': {
                    text: '*sieht dein Schwert an und lacht* Bei den Göttern, das Ding ist ja stumpfer als ein Löffel! Damit kannst du höchstens Butter schneiden.',
                    options: [
                        { text: 'Kannst du es schärfen?', next: 'sharpen_offer' },
                        { text: 'Es ist alles was ich habe...', next: 'sharpen_offer' }
                    ]
                },
                'sharpen_offer': {
                    text: 'Schärfen? Ja, das könnte ich. Aber ich brauche Material. Bring mir 10 Eisenerz aus der Mine im Osten, dann mache ich dir ein ordentliches Schwert daraus.',
                    options: [
                        { text: 'Wo ist die Mine?', next: 'mine_directions' },
                        { text: 'Das mache ich.', next: 'accept_quest' }
                    ]
                },
                'mine_directions': {
                    text: 'Die Mine ist im Osten, folge dem Pfad. Aber sei gewarnt - seit dem Nebel hausen dort Spinnen. Große Spinnen. *drückt dir etwas in die Hand* Hier, nimm zwei Heiltränke. Du wirst sie brauchen.',
                    options: [
                        { text: '[Heiltränke nehmen] Danke für die Warnung.', next: null, action: 'start_mine_quest' }
                    ]
                },
                'accept_quest': {
                    text: '*nickt* Gut. Die Mine ist im Osten. Aber Vorsicht - dort hausen jetzt Spinnen. *drückt dir etwas in die Hand* Hier, zwei Heiltränke. Du wirst sie brauchen.',
                    options: [
                        { text: '[Heiltränke nehmen] Ich komme wieder.', next: null, action: 'start_mine_quest' }
                    ]
                },
                'waiting_for_ore': {
                    text: 'Hast du das Eisenerz? 10 Stück brauche ich.',
                    options: [
                        { text: '[10 Eisenerz abgeben]', next: 'ore_delivered', action: 'deliver_ore', condition: () => Player.hasItem('iron_ore', 10) },
                        { text: 'Noch nicht, ich bin noch in der Mine.', next: null },
                        { text: 'Ich möchte etwas verkaufen.', next: null, action: 'open_blacksmith_shop' }
                    ]
                },
                'ore_delivered': {
                    text: '*nimmt das Erz und wiegt es in der Hand* Gute Qualität! Gib mir dein stumpfes Schwert... *arbeitet kurz daran* ...Fertig! Ein scharfes Schwert. Damit kannst du ordentlich Schaden anrichten.',
                    options: [
                        { text: '[Scharfes Schwert erhalten] Vielen Dank!', next: null, action: 'complete_sword_quest' }
                    ]
                },
                'after_sword_quest': {
                    text: '*hämmert weiter* Das Schwert dient dir gut, hoffe ich. Falls du etwas kaufen oder verkaufen willst, ich bin hier.',
                    options: [
                        { text: 'Was hast du anzubieten?', next: 'blacksmith_shop' },
                        { text: 'Ich möchte etwas verkaufen.', next: 'blacksmith_sell' },
                        { text: 'Danke, Schmied.', next: null }
                    ]
                },
                'blacksmith_shop': {
                    text: () => `Ich habe Waffen und Rüstungen. Was brauchst du? (Dein Gold: ${Player.gold})`,
                    options: [
                        { text: 'Kurzschwert (30 Gold, +4 Schaden)', next: 'blacksmith_shop', action: 'buy_short_sword', condition: () => !Player.flags.bought_short_sword },
                        { text: 'Eisenschwert (50 Gold, +6 Schaden)', next: 'blacksmith_shop', action: 'buy_iron_sword', condition: () => !Player.flags.bought_iron_sword },
                        { text: 'Streitaxt (75 Gold, +9 Schaden)', next: 'blacksmith_shop', action: 'buy_battle_axe', condition: () => !Player.flags.bought_battle_axe },
                        { text: 'Holzschild (20 Gold, +2 Verteidigung)', next: 'blacksmith_shop', action: 'buy_wooden_shield', condition: () => !Player.flags.bought_wooden_shield },
                        { text: 'Eisenschild (40 Gold, +4 Verteidigung)', next: 'blacksmith_shop', action: 'buy_iron_shield', condition: () => !Player.flags.bought_iron_shield },
                        { text: 'Lederrüstung (35 Gold, +3 Verteidigung)', next: 'blacksmith_shop', action: 'buy_leather_armor', condition: () => !Player.flags.bought_leather_armor },
                        { text: 'Kettenhemd (60 Gold, +5 Verteidigung)', next: 'blacksmith_shop', action: 'buy_chainmail', condition: () => !Player.flags.bought_chainmail },
                        { text: '[Verkaufen]', next: 'blacksmith_sell' },
                        { text: 'Nichts, danke.', next: null }
                    ]
                },
                'smith_bought': {
                    text: '*übergibt die Ware* Gute Wahl. Das wird dir gute Dienste leisten.',
                    options: [
                        { text: 'Noch etwas kaufen.', next: 'blacksmith_shop' },
                        { text: 'Etwas verkaufen.', next: 'blacksmith_sell' },
                        { text: 'Danke.', next: null }
                    ]
                },
                'blacksmith_sell': {
                    text: 'Ich kaufe Waffen, Rüstungen und Erze. Was hast du?',
                    options: [
                        { text: 'Banditen-Dolch (8 Gold)', next: 'smith_sold', action: 'sell_bandit_dagger', condition: () => Player.hasItem('bandit_dagger') },
                        { text: 'Spinnenbein (2 Gold)', next: 'smith_sold', action: 'sell_spider_leg', condition: () => Player.hasItem('spider_leg') },
                        { text: 'Großes Spinnenbein (15 Gold)', next: 'smith_sold', action: 'sell_giant_spider_leg', condition: () => Player.hasItem('giant_spider_leg') },
                        { text: 'Spinnenseide (12 Gold)', next: 'smith_sold', action: 'sell_spider_silk', condition: () => Player.hasItem('spider_silk') },
                        { text: 'Eidechsenschuppe (4 Gold)', next: 'smith_sold', action: 'sell_lizard_scale', condition: () => Player.hasItem('lizard_scale') },
                        { text: 'Wolfsfell (15 Gold)', next: 'smith_sold', action: 'sell_wolf_pelt', condition: () => Player.hasItem('wolf_pelt') },
                        { text: 'Zurück zum Kaufen', next: 'blacksmith_shop' },
                        { text: 'Nichts.', next: null }
                    ]
                },
                'smith_sold': {
                    text: '*wiegt das Material in der Hand* Das kann ich gebrauchen. Hier ist dein Gold.',
                    options: [
                        { text: 'Noch etwas verkaufen.', next: 'blacksmith_sell' },
                        { text: 'Etwas kaufen.', next: 'blacksmith_shop' },
                        { text: 'Danke.', next: null }
                    ]
                },
                'noble_reward': {
                    text: '*sieht dich mit Respekt an* Ich habe gehört was du für die arme Witwe getan hast. Du hast ihr das Amulett zurückgegeben und kein Gold genommen. Das ist wahre Ehre. *greift hinter sich* Hier, nimm dieses Schwert. Es ist 100 Gold wert, aber für jemanden wie dich - kostenlos.',
                    options: [
                        { text: '[Eisenschwert annehmen] Ich danke Euch, Schmied.', next: 'after_noble_reward', action: 'receive_noble_weapon' }
                    ]
                },
                'after_noble_reward': {
                    text: 'Du hast es verdient. Solche Menschen brauchen wir in diesen dunklen Zeiten.',
                    options: [
                        { text: 'Ich werde es in Ehren halten.', next: null }
                    ]
                }
            }
        },
        'village_elder': {
            id: 'village_elder',
            name: 'Dorfältester Grimwald',
            icon: '👴',
            dialogs: {
                'default': {
                    text: 'Willkommen, Fremder. Du bist der erste Reisende seit vielen Monden. Die Dunkelheit hat unser Dorf fest im Griff...',
                    options: [
                        { text: 'Was ist hier geschehen?', next: 'story' },
                        { text: 'Auf Wiedersehen.', next: null }
                    ]
                },
                'story': {
                    text: 'Vor drei Monaten kam der Nebel. Mit ihm kamen die Untoten. Sie streifen nachts durch die Straßen. Viele sind geflohen, andere... wurden zu ihnen.',
                    options: [
                        { text: 'Das klingt schrecklich...', next: null }
                    ]
                }
            }
        },
        'hunter': {
            id: 'hunter',
            name: 'Jäger Erik',
            icon: '🏹',
            dialogs: {
                'default': {
                    text: '*hält sich den Arm* Verdammt... diese Wölfe haben mich erwischt. Ich kann so nicht jagen. Hört, ich brauche Hilfe.',
                    options: [
                        { text: 'Was ist passiert?', next: 'explain' },
                        { text: 'Wie kann ich helfen?', next: 'quest_offer' }
                    ]
                },
                'explain': {
                    text: 'Im Wald im Norden sind Wölfe aufgetaucht. Große, böse Biester. Sie haben mich angegriffen als ich jagen war. Ich konnte gerade so fliehen.',
                    options: [
                        { text: 'Wie kann ich helfen?', next: 'quest_offer' },
                        { text: 'Das tut mir leid.', next: null }
                    ]
                },
                'quest_offer': {
                    text: 'Ich brauche 3 Wolfsfelle für neue Ausrüstung. Wenn du sie mir bringst, gebe ich dir meinen Bogen. Ein guter Bogen - trifft härter als jedes Schwert, aber du brauchst beide Hände dafür.',
                    options: [
                        { text: 'Ich bringe dir die Felle.', next: null, action: 'start_wolf_quest' },
                        { text: 'Vielleicht später.', next: null }
                    ]
                },
                'waiting_for_pelts': {
                    text: 'Hast du die 3 Wolfsfelle? Die Wölfe sind im nördlichen Wald.',
                    options: [
                        { text: '[3 Wolfsfelle abgeben]', next: 'pelts_delivered', action: 'deliver_pelts', condition: () => Player.hasItem('wolf_pelt', 3) },
                        { text: 'Noch nicht, ich suche noch.', next: null }
                    ]
                },
                'pelts_delivered': {
                    text: '*nimmt die Felle* Ausgezeichnet! Gute Qualität. Hier, wie versprochen - mein Bogen. Er braucht beide Hände, aber er trifft hart. Je geschickter du bist, desto mehr Schaden machst du damit.',
                    options: [
                        { text: '[Jagdbogen erhalten] Danke!', next: null, action: 'complete_wolf_quest' }
                    ]
                },
                'after_quest': {
                    text: 'Der Bogen dient dir hoffentlich gut. Geschick ist alles beim Bogenschießen - je mehr du davon hast, desto tödlicher bist du.',
                    options: [
                        { text: 'Danke für den Rat.', next: null }
                    ]
                }
            }
        },
        'worried_woman': {
            id: 'worried_woman',
            name: 'Besorgte Frau Marta',
            icon: '👩',
            dialogs: {
                'default': {
                    text: '*weint leise* Bitte... habt Ihr meinen Mann gesehen? Er wollte im Wald jagen und ist seit zwei Tagen nicht zurück...',
                    options: [
                        { text: '[Die Wahrheit sagen]', next: 'truth', condition: () => Player.flags.looted_husband },
                        { text: '[Lügen - Amulett behalten]', next: 'lie', condition: () => Player.flags.looted_husband },
                        { text: 'Ich halte die Augen offen.', next: null }
                    ]
                },
                'truth': {
                    text: '*bricht zusammen und weint* Nein... NEIN! Mein Heinrich... *schluchzt* Aber... Ihr habt sein Amulett! Es ist ein Familienerbstück. *nimmt es mit zitternden Händen* Danke... danke! Hier, nehmt dieses Gold.',
                    options: [
                        { text: '[50 Gold annehmen] Es tut mir sehr leid für Euren Verlust.', next: null, action: 'complete_husband_quest_gold' },
                        { text: '[Gold ablehnen] Behaltet es. Ich hoffe es geht Euch bald besser.', next: 'refuse_gold' }
                    ]
                },
                'refuse_gold': {
                    text: '*starrt dich ungläubig an* Ihr... Ihr wollt kein Gold? *neue Tränen* Es gibt noch gute Menschen auf dieser Welt... Mögen die Götter Euch segnen, edler Wanderer.',
                    options: [
                        { text: 'Passt auf Euch auf.', next: null, action: 'complete_husband_quest_noble' }
                    ]
                },
                'lie': {
                    text: '*schluchzt hoffnungslos* Also habt Ihr ihn auch nicht gesehen... Ich... ich werde weiter warten. Vielleicht kommt er noch zurück...',
                    options: [
                        { text: '[Gehen]', next: null, action: 'complete_husband_quest_lie' }
                    ]
                }
            }
        },
        'herbalist': {
            id: 'herbalist',
            name: 'Kräuterfrau Helga',
            icon: '🧙‍♀️',
            dialogs: {
                'default': {
                    text: '*sortiert getrocknete Kräuter* Ah, ein Fremder! Ihr seht mitgenommen aus. Ich könnte Euch helfen... aber ich brauche selbst etwas.',
                    options: [
                        { text: 'Was braucht Ihr?', next: 'quest_offer' },
                        { text: 'Vielleicht später.', next: null }
                    ]
                },
                'quest_offer': {
                    text: 'Im westlichen Sumpf wächst Mondblumenkraut - eine seltene Pflanze die nur nachts blüht. Bringt mir 5 davon und ich braue Euch einen mächtigen Heiltrank. Aber Vorsicht, der Sumpf ist gefährlich!',
                    options: [
                        { text: 'Ich werde das Kraut besorgen.', next: null, action: 'start_herb_quest' },
                        { text: 'Das klingt zu gefährlich.', next: null }
                    ]
                },
                'waiting': {
                    text: 'Habt Ihr das Mondblumenkraut? Ich brauche 5 Stück davon.',
                    options: [
                        { text: '[5 Mondblumenkraut abgeben]', next: 'herbs_delivered', action: 'deliver_herbs', condition: () => Player.hasItem('moonflower', 5) },
                        { text: 'Ich suche noch...', next: null }
                    ]
                },
                'herbs_delivered': {
                    text: '*nimmt die Kräuter mit leuchtenden Augen* Wunderbar! So frisch! Hier, wie versprochen - ein großer Heiltrank, gebraut nach altem Rezept. Er heilt mehr als die üblichen Tränke!',
                    options: [
                        { text: '[Großen Heiltrank erhalten] Danke!', next: null, action: 'complete_herb_quest' }
                    ]
                },
                'after_quest': {
                    text: 'Ihr habt mir sehr geholfen. Falls Ihr mehr Heiltränke braucht, ich verkaufe sie auch.',
                    options: [
                        { text: 'Was kostet ein Heiltrank?', next: 'shop' },
                        { text: 'Danke, vielleicht später.', next: null }
                    ]
                },
                'shop': {
                    text: 'Ein normaler Heiltrank kostet 25 Gold, ein großer 50 Gold. Ich kaufe auch Zutaten.',
                    options: [
                        { text: '[25 Gold] Heiltrank kaufen', next: 'bought', action: 'buy_health_potion', condition: () => Player.gold >= 25 },
                        { text: '[50 Gold] Großen Heiltrank kaufen', next: 'bought', action: 'buy_large_health_potion', condition: () => Player.gold >= 50 },
                        { text: '[Verkaufen]', next: 'herb_sell_menu' },
                        { text: 'Nichts, danke.', next: null }
                    ]
                },
                'herb_sell_menu': {
                    text: 'Ich kaufe Kräuter und Monsterzutaten für meine Tränke.',
                    options: [
                        { text: 'Spinnenei (10 Gold)', next: 'herb_sold', action: 'sell_spider_egg', condition: () => Player.hasItem('spider_egg') },
                        { text: 'Giftsack (25 Gold)', next: 'herb_sold', action: 'sell_poison_sac', condition: () => Player.hasItem('poison_sac') },
                        { text: 'Eidechsenschwanz (8 Gold)', next: 'herb_sold', action: 'sell_lizard_tail', condition: () => Player.hasItem('lizard_tail') },
                        { text: 'Mondblumenkraut (10 Gold)', next: 'herb_sold', action: 'sell_moonflower', condition: () => Player.hasItem('moonflower') },
                        { text: 'Zurück zum Kaufen', next: 'shop' },
                        { text: 'Nichts.', next: null }
                    ]
                },
                'herb_sold': {
                    text: '*untersucht die Zutat* Gute Qualität! Hier, Euer Gold.',
                    options: [
                        { text: 'Noch etwas verkaufen.', next: 'herb_sell_menu' },
                        { text: 'Etwas kaufen.', next: 'shop' },
                        { text: 'Danke.', next: null }
                    ]
                },
                'bought': {
                    text: '*übergibt den Trank* Möge er Euch gute Dienste leisten.',
                    options: [
                        { text: 'Noch einen kaufen.', next: 'shop' },
                        { text: 'Danke.', next: null }
                    ]
                }
            }
        },
        'old_fisherman': {
            id: 'old_fisherman',
            name: 'Alter Fischer Berthold',
            icon: '🎣',
            dialogs: {
                'default': {
                    text: '*sitzt am Dorfbrunnen und flickt ein Netz* Früher war ich Fischer am großen See... bis die Kreaturen kamen. Jetzt gibt es keine Fische mehr, nur noch Monster.',
                    options: [
                        { text: 'Was für Kreaturen?', next: 'creatures' },
                        { text: 'Kann ich irgendwie helfen?', next: 'quest_offer' }
                    ]
                },
                'creatures': {
                    text: 'Riesige Spinnen, Wölfe die keine Angst vor Feuer haben, und... *senkt die Stimme* ...manchmal sehe ich Schatten die sich bewegen wo keine sein sollten.',
                    options: [
                        { text: 'Kann ich irgendwie helfen?', next: 'quest_offer' },
                        { text: 'Das klingt beunruhigend...', next: null }
                    ]
                },
                'quest_offer': {
                    text: 'Mein alter Angelplatz am See... dort habe ich meine beste Angelrute zurückgelassen als ich fliehen musste. Sie war ein Erbstück meines Vaters. Wenn Ihr sie mir bringt, gebe ich Euch alles Gold was ich noch habe - 80 Stück!',
                    options: [
                        { text: 'Wo ist dieser Angelplatz?', next: 'directions' },
                        { text: 'Das mache ich.', next: null, action: 'start_fishing_rod_quest' }
                    ]
                },
                'directions': {
                    text: 'Der See liegt im Westen, hinter dem Sumpf. Aber seid vorsichtig - der Weg führt durch gefährliches Gebiet. Riesenfrösche und Sumpfeidechsen lauern dort.',
                    options: [
                        { text: 'Ich werde die Angelrute finden.', next: null, action: 'start_fishing_rod_quest' },
                        { text: 'Das klingt zu gefährlich.', next: null }
                    ]
                },
                'waiting': {
                    text: 'Habt Ihr meine Angelrute gefunden? Sie müsste am westlichen See sein.',
                    options: [
                        { text: '[Angelrute übergeben]', next: 'rod_delivered', action: 'deliver_fishing_rod', condition: () => Player.hasItem('old_fishing_rod') },
                        { text: 'Ich suche noch...', next: null }
                    ]
                },
                'rod_delivered': {
                    text: '*Tränen steigen in seine Augen* Die Rute meines Vaters... Ich dachte sie wäre für immer verloren! Hier, nehmt das Gold. Ihr habt einem alten Mann das Herz erwärmt.',
                    options: [
                        { text: '[80 Gold erhalten] Es war mir eine Ehre.', next: null, action: 'complete_fishing_rod_quest' }
                    ]
                },
                'after_quest': {
                    text: '*betrachtet liebevoll die Angelrute* Vielleicht... vielleicht gibt es doch noch Hoffnung in dieser dunklen Zeit. Vor zwei Jahren hätte ich nie gedacht dass es so schlimm werden würde...',
                    options: [
                        { text: 'Was ist vor zwei Jahren passiert?', next: 'two_years_ago' },
                        { text: 'Passt auf Euch auf, alter Mann.', next: null }
                    ]
                },
                'two_years_ago': {
                    text: '*seufzt* Der König wurde ermordet. Eine ganze Armee aus... aus Toten kam in der Nacht. Seitdem ist nichts mehr wie es war. Monster überall, keine Gesetze, keine Hoffnung. Man sagt ein Totenbeschwörer herrscht jetzt über das Land.',
                    options: [
                        { text: 'Danke für die Information.', next: null }
                    ]
                }
            }
        },
        
        // ===== CITY NPCs =====
        'traveling_merchant': {
            id: 'traveling_merchant',
            name: 'Fahrender Händler Viktor',
            icon: '🧳',
            dialogs: {
                'default': {
                    text: '*sitzt an einem kleinen Feuer* Ah, ein Reisender! Seid vorsichtig - die Straßen sind nicht mehr sicher seit... nun ja, seit alles bergab ging. *mustert dich* Ihr seht aus wie jemand der sich wehren kann.',
                    options: [
                        { text: 'Was führt Euch hierher?', next: 'merchant_story' },
                        { text: 'Habt Ihr etwas zu verkaufen?', next: 'merchant_shop' },
                        { text: 'Braucht Ihr Hilfe?', next: 'merchant_quest', condition: () => !Player.flags.merchant_quest_done }
                    ]
                },
                'merchant_story': {
                    text: 'Ich bin auf dem Weg nach Dunkelheim im Norden. Kleine Dörfer zahlen gut für Waren. *seufzt* Früher war diese Straße voller Händler. Jetzt... bin ich einer der Wenigen die es noch wagen.',
                    options: [
                        { text: 'Braucht Ihr Hilfe?', next: 'merchant_quest', condition: () => !Player.flags.merchant_quest_done },
                        { text: 'Habt Ihr etwas zu verkaufen?', next: 'merchant_shop' },
                        { text: 'Seid vorsichtig.', next: null }
                    ]
                },
                'merchant_quest': {
                    text: '*sieht sich um* Tatsächlich ja. Ein Dieb hat mir Waren gestohlen und ist in die Kanalisation der Stadt geflohen. Der Eingang ist in der Taverne. Findet meine Waren und ich gebe Euch 150 Gold und einen magischen Ring!',
                    options: [
                        { text: 'Ich werde es versuchen.', next: null, action: 'start_merchant_quest' },
                        { text: 'Das klingt gefährlich...', next: null }
                    ]
                },
                'waiting_goods': {
                    text: 'Habt Ihr meine gestohlenen Waren gefunden? Der Dieb ist in die Kanalisation geflohen.',
                    options: [
                        { text: '[Waren übergeben]', next: 'goods_returned', action: 'complete_merchant_quest', condition: () => Player.hasItem('merchant_goods') },
                        { text: 'Ich suche noch.', next: null }
                    ]
                },
                'goods_returned': {
                    text: '*strahlt* Meine Waren! Ich hatte die Hoffnung schon aufgegeben! Hier, wie versprochen - 150 Gold und dieser Ring. Er ist magisch, sagt man.',
                    options: [
                        { text: '[Belohnung annehmen]', next: null, action: 'merchant_reward' }
                    ]
                },
                'after_quest': {
                    text: '*packt seine Sachen* Dank Euch kann ich meine Reise fortsetzen. Mögen die Götter Euch beschützen!',
                    options: [
                        { text: 'Habt Ihr etwas zu verkaufen?', next: 'merchant_shop' },
                        { text: 'Gute Reise!', next: null }
                    ]
                },
                'merchant_shop': {
                    text: () => `Ich habe ein paar nützliche Dinge. (Euer Gold: ${Player.gold})`,
                    options: [
                        { text: 'Großer Heiltrank (50 Gold) - Heilt 60 LP', next: 'merchant_shop', action: 'buy_large_health_potion' },
                        { text: 'Manatrank (30 Gold) - +30 Mana', next: 'merchant_shop', action: 'buy_mana_potion_merchant' },
                        { text: 'Zurück', next: null }
                    ]
                }
            }
        },
        'city_guard': {
            id: 'city_guard',
            name: 'Müde Wache',
            icon: '💂',
            dialogs: {
                'default': {
                    text: '*lehnt müde an seinem Speer* Willkommen in Grauenfels, Fremder. Oder was davon übrig ist. *gähnt* Wir haben kaum noch Männer um die Mauern zu besetzen.',
                    options: [
                        { text: 'Was ist hier passiert?', next: 'city_history' },
                        { text: 'Ist es sicher in der Stadt?', next: 'safety' },
                        { text: 'Auf Wiedersehen.', next: null }
                    ]
                },
                'city_history': {
                    text: 'Vor zwei Jahren war Grauenfels eine blühende Handelsstadt. Dann kam die Nachricht... der König ist tot. Ermordet von seinem eigenen... *senkt die Stimme* Man sagt der Totenbeschwörer hatte Spione überall. Selbst in der königlichen Familie.',
                    options: [
                        { text: 'Spione in der königlichen Familie?', next: 'royal_spies' },
                        { text: 'Danke für die Information.', next: null }
                    ]
                },
                'royal_spies': {
                    text: '*flüstert* Es heißt, eine adlige Familie hat dem Schattenfürst seit Generationen gedient. Sie haben ihm geholfen den König zu ermorden. *schaut sich um* Aber das sind nur Gerüchte... hoffe ich.',
                    options: [
                        { text: 'Interessant...', next: null }
                    ]
                },
                'safety': {
                    text: 'Innerhalb der Mauern ist es... einigermaßen sicher. Aber meidet die westlichen Ruinen - dort treiben sich Untote herum. Und die Kathedrale im Norden... *schaudert* Geht nicht dorthin.',
                    options: [
                        { text: 'Warum nicht zur Kathedrale?', next: 'cathedral_warning' },
                        { text: 'Verstanden.', next: null }
                    ]
                },
                'cathedral_warning': {
                    text: 'Dort fand das Massaker statt. Als der Schattenfürst die Macht übernahm, hat er alle Priester in einer einzigen Nacht töten lassen. Jetzt... wandeln sie dort als Untote. *schüttelt den Kopf* Ein Ort des Grauens.',
                    options: [
                        { text: 'Danke für die Warnung.', next: null, action: 'learn_cathedral' }
                    ]
                }
            }
        },
        'old_seer': {
            id: 'old_seer',
            name: 'Alte Seherin Magda',
            icon: '🔮',
            dialogs: {
                'default': {
                    text: '*blickt dich mit milchigen Augen an* Du... *greift nach deinem Arm* Du bist anders. Ich spüre es. Der Tod hat dich berührt, aber du lebst. Wie ist das möglich?',
                    options: [
                        { text: 'Ich... weiß es nicht. Ich habe meine Erinnerung verloren.', next: 'memory_lost' },
                        { text: 'Wer seid Ihr?', next: 'seer_intro' }
                    ]
                },
                'seer_intro': {
                    text: 'Ich bin Magda, die letzte Seherin von Grauenfels. Meine Schwestern wurden alle... getötet. Der Schattenfürst fürchtet uns, denn wir können die Wahrheit sehen.',
                    options: [
                        { text: 'Was könnt Ihr mir über mich sagen?', next: 'memory_lost' },
                        { text: 'Was wisst Ihr über den Schattenfürst?', next: 'shadow_lord_info' }
                    ]
                },
                'memory_lost': {
                    text: '*schließt die Augen* Ich sehe... Dunkelheit. Verrat. Blut. *zittert* Du wurdest getötet. Mit einem Schwert durch die Brust. Aber etwas... oder jemand... hat dich zurückgebracht. *öffnet die Augen* Und du warst nicht allein als du starbst.',
                    options: [
                        { text: 'Nicht allein? Was meint Ihr?', next: 'not_alone' },
                        { text: 'Wer hat mich zurückgebracht?', next: 'brought_back' }
                    ]
                },
                'not_alone': {
                    text: '*greift sich an den Kopf* Ein... Kopf. Abgetrennt. Neben dir. *keucht* Familie... es war Familie! Dein Blut, dein Fleisch! *verstummt* Die Vision verblasst. Ich kann nicht mehr sehen. Aber such in den Ruinen nach Hinweisen.',
                    options: [
                        { text: 'Die Ruinen?', next: 'ruins_hint', action: 'learn_ruins' },
                        { text: 'Danke, Seherin.', next: null, action: 'met_seer' }
                    ]
                },
                'brought_back': {
                    text: 'Das... *zögert* ...weiß ich nicht. Solche Macht... nur der Schattenfürst selbst könnte Tote zurückbringen. Aber warum würde er das tun? *schüttelt den Kopf* Such nach Antworten. In den westlichen Ruinen gibt es alte Dokumente.',
                    options: [
                        { text: 'Die Ruinen?', next: 'ruins_hint', action: 'learn_ruins' },
                        { text: 'Danke.', next: null, action: 'met_seer' }
                    ]
                },
                'ruins_hint': {
                    text: 'Die westlichen Ruinen waren einst das Adelsviertel. Dort lebten die Familien die dem König am nächsten standen. Vielleicht findest du dort Antworten über deine Vergangenheit. Aber sei gewarnt - Geister und Skelette lauern dort.',
                    options: [
                        { text: 'Ich werde vorsichtig sein.', next: null, action: 'met_seer' }
                    ]
                },
                'shadow_lord_info': {
                    text: '*senkt die Stimme* Der Schattenfürst war nicht immer böse. Er war einst ein Hofmagier. Aber Macht korrumpiert... Er lernte verbotene Magie. Totenbeschwörung. Und dann... *flüstert* ...dann kam die Nacht des Blutes.',
                    options: [
                        { text: 'Die Nacht des Blutes?', next: 'night_of_blood' },
                        { text: 'Was könnt Ihr mir über mich sagen?', next: 'memory_lost' }
                    ]
                },
                'night_of_blood': {
                    text: 'In einer einzigen Nacht hat er mit seiner untoten Armee den gesamten Königshof ausgelöscht. König, Königin, Prinzen, Berater - alle tot. Und er hatte Helfer. *blickt dich durchdringend an* Eine Familie die ihm seit Generationen diente...',
                    options: [
                        { text: 'Eine Familie?', next: 'traitor_family' },
                        { text: 'Das ist schrecklich.', next: null, action: 'met_seer' }
                    ]
                },
                'traitor_family': {
                    text: '*packt deinen Arm* Ja. Adlige. Sie haben ihm Informationen geliefert, Türen geöffnet, Wachen bestochen. Ohne sie hätte er niemals... *starrt dich an* Warum... warum kommt mir dein Gesicht so bekannt vor?',
                    options: [
                        { text: '...', next: null, action: 'met_seer' }
                    ]
                },
                'after_met': {
                    text: '*nickt dir zu* Ah, du bist zurück. Hast du in den Ruinen gefunden was du suchst?',
                    options: [
                        { text: 'Ja, ich habe Dokumente gefunden.', next: 'documents_found', condition: () => Player.flags.found_documents },
                        { text: 'Noch nicht.', next: null }
                    ]
                },
                'documents_found': {
                    text: '*nimmt deine Hand* Ich spüre es... du hast etwas entdeckt das dich verstört. Die Wahrheit ist oft schmerzhaft. Aber sie ist der erste Schritt zur Erlösung. *flüstert* Die nächste Stadt im Osten - dort gibt es einen Mann der mehr weiß.',
                    options: [
                        { text: 'Wer ist dieser Mann?', next: 'next_hint' },
                        { text: 'Danke, Seherin.', next: null }
                    ]
                },
                'next_hint': {
                    text: 'Sein Name ist Aldric. Er war... ein Diener der Familie von der ich sprach. Die Verräter-Familie. Er lebt jetzt in der Stadt Steinwacht, östlich von hier. Er könnte dir sagen wer du wirklich bist.',
                    options: [
                        { text: 'Ich werde ihn finden.', next: null }
                    ]
                }
            }
        },
        'city_merchant': {
            id: 'city_merchant',
            name: 'Händlerin Elara',
            icon: '👩‍🦰',
            dialogs: {
                'default': {
                    text: '*ordnet ihre spärlichen Waren* Willkommen. Ich habe nicht viel, aber was ich habe ist von guter Qualität. *seufzt* Früher hatte ich einen ganzen Laden... bevor die Monster kamen.',
                    options: [
                        { text: 'Was habt Ihr zu verkaufen?', next: 'elara_shop' },
                        { text: 'Braucht Ihr Hilfe?', next: 'elara_quest', condition: () => !Player.flags.elara_quest_done }
                    ]
                },
                'elara_shop': {
                    text: () => `Hier ist mein bescheidenes Angebot. (Euer Gold: ${Player.gold})`,
                    options: [
                        { text: 'Heiltrank (25 Gold)', next: 'elara_shop', action: 'buy_health_elara' },
                        { text: 'Manatrank (20 Gold)', next: 'elara_shop', action: 'buy_mana_elara' },
                        { text: 'Brot (10 Gold)', next: 'elara_shop', action: 'buy_bread_elara' },
                        { text: 'Braucht Ihr Hilfe?', next: 'elara_quest', condition: () => !Player.flags.elara_quest_done },
                        { text: 'Zurück', next: null }
                    ]
                },
                'elara_quest': {
                    text: '*blickt zur Kathedrale* Mein Bruder war Priester... er wurde getötet als der Schattenfürst die Macht ergriff. *Tränen* In der Kathedrale gibt es ein heiliges Symbol - das Symbol unserer Familie. Bitte... holt es für mich.',
                    options: [
                        { text: 'Ich werde es versuchen.', next: null, action: 'start_elara_quest' },
                        { text: 'Das klingt zu gefährlich.', next: null }
                    ]
                },
                'waiting_symbol': {
                    text: 'Habt Ihr das heilige Symbol aus der Kathedrale geholt?',
                    options: [
                        { text: '[Symbol übergeben]', next: 'symbol_returned', action: 'complete_elara_quest', condition: () => Player.hasItem('holy_symbol') },
                        { text: 'Noch nicht.', next: null }
                    ]
                },
                'symbol_returned': {
                    text: '*nimmt das Symbol mit zitternden Händen* M-mein Bruder... *weint* Danke. Danke! Hier, nehmt alles was ich habe. Ihr habt mir meinen Seelenfrieden zurückgegeben.',
                    options: [
                        { text: '[Belohnung annehmen]', next: null, action: 'elara_reward' }
                    ]
                },
                'after_quest': {
                    text: '*trägt das Symbol um den Hals* Dank Euch habe ich wieder Hoffnung. Kauft was Ihr braucht - für Euch mache ich Sonderpreise.',
                    options: [
                        { text: 'Was habt Ihr zu verkaufen?', next: 'elara_shop_discount' },
                        { text: 'Gern geschehen.', next: null }
                    ]
                },
                'elara_shop_discount': {
                    text: () => `Für Euch nur das Beste! (Euer Gold: ${Player.gold})`,
                    options: [
                        { text: 'Heiltrank (15 Gold) - Rabatt!', next: 'elara_shop_discount', action: 'buy_health_elara_discount' },
                        { text: 'Manatrank (12 Gold) - Rabatt!', next: 'elara_shop_discount', action: 'buy_mana_elara_discount' },
                        { text: 'Zurück', next: null }
                    ]
                }
            }
        },
        'town_crier': {
            id: 'town_crier',
            name: 'Ausrufer',
            icon: '📣',
            dialogs: {
                'default': {
                    text: '*räuspert sich* Hört, hört! Neuigkeiten aus dem Reich! *sieht dich* Oh, ein Fremder. Wollt Ihr die neuesten Nachrichten hören?',
                    options: [
                        { text: 'Was gibt es Neues?', next: 'news' },
                        { text: 'Nein danke.', next: null }
                    ]
                },
                'news': {
                    text: '*seufzt* Nur schlechte Nachrichten, wie immer. Monster-Sichtungen nehmen zu. Drei weitere Dörfer im Osten wurden verlassen. Und... *senkt die Stimme* ...man sagt der Schattenfürst sammelt eine neue Armee.',
                    options: [
                        { text: 'Eine neue Armee?', next: 'army_rumor' },
                        { text: 'Danke für die Information.', next: null }
                    ]
                },
                'army_rumor': {
                    text: '*flüstert* Untote. Tausende von Untoten marschieren angeblich in seine Festung im Norden. Manche sagen er plant einen letzten Schlag um die verbliebenen freien Städte zu erobern. *schaudert* Mögen die Götter uns beistehen.',
                    options: [
                        { text: 'Das klingt bedrohlich.', next: null }
                    ]
                }
            }
        },
        // ===== ZUSAMMENHÄNGENDE QUESTS: Kranker Heiler + Kräutersammlerin =====
        'sick_healer': {
            id: 'sick_healer',
            name: 'Kranker Heiler Marcus',
            icon: '🤒',
            dialogs: {
                'default': {
                    text: '*hustet schwer* Fremder... *keuch* Ich bin Marcus, der Heiler dieser Stadt. Oder war es... diese Krankheit frisst mich auf.',
                    options: [
                        { text: 'Kann ich Euch helfen?', next: 'help_offer' },
                        { text: 'Ihr seid der Heiler?', next: 'healer_info' }
                    ]
                },
                'help_offer': {
                    text: '*fasst Hoffnung* Wirklich? *hustet* Es gibt eine Frau... Greta, die Kräutersammlerin. Sie lebt am Rand der Stadt. Sie kennt ein Heilmittel, aber... *keucht* ...sie weigert sich mir zu helfen. Wir hatten... Streit.',
                    options: [
                        { text: 'Was für ein Streit?', next: 'explain_fight' },
                        { text: 'Ich spreche mit ihr.', next: 'accept_healer_quest', action: 'start_healer_quest' }
                    ]
                },
                'healer_info': {
                    text: '*nickt schwach* Vierzig Jahre habe ich Kranke geheilt. Nun... *hustet Blut* ...nun bin ich selbst am Ende. Die Ironie.',
                    options: [
                        { text: 'Kann ich Euch helfen?', next: 'help_offer' },
                        { text: 'Das tut mir leid.', next: null }
                    ]
                },
                'explain_fight': {
                    text: '*senkt den Blick* Vor einem Jahr... ihr Sohn kam zu mir. Schwer verletzt. Ich... ich konnte ihn nicht retten. Sie gibt mir die Schuld. *hustet* Vielleicht hat sie Recht.',
                    options: [
                        { text: 'Ich versuche sie zu überreden.', next: 'accept_healer_quest', action: 'start_healer_quest' },
                        { text: 'Das ist traurig.', next: null }
                    ]
                },
                'accept_healer_quest': {
                    text: '*greift deine Hand* Danke, Fremder. Wenn du sie überzeugen kannst... *hustet* ...sag ihr ich bereue was passiert ist. Jeden Tag.',
                    options: [
                        { text: 'Ich finde sie.', next: null }
                    ]
                },
                'waiting': {
                    text: '*hustet* Hast du... mit Greta gesprochen? *keuch*',
                    options: [
                        { text: '[Medizin übergeben]', next: 'cured', action: 'complete_healer_quest', condition: () => Player.hasItem('healing_herbs') },
                        { text: 'Noch nicht.', next: null }
                    ]
                },
                'cured': {
                    text: '*trinkt die Medizin* Ah... *atmet tief* Ich fühle schon wie die Kraft zurückkehrt. *steht auf* Du hast mir das Leben gerettet, Fremder. Nimm diese Belohnung - und wenn du je Heilung brauchst, komm zu mir.',
                    options: [
                        { text: '[Belohnung: 40 Gold + Heiler-Dienste freigeschaltet]', next: null, action: 'healer_reward' }
                    ]
                },
                'after_quest': {
                    text: '*steht aufrecht* Mein Retter! Wie kann ich dir helfen? Ich kann deine Wunden heilen - für einen kleinen Beitrag zu meinen Kräuterkosten.',
                    options: [
                        { text: 'Heilt mich (15 Gold)', next: 'after_quest', action: 'buy_heal_marcus', condition: () => Player.gold >= 15 },
                        { text: 'Danke, nicht jetzt.', next: null }
                    ]
                }
            }
        },
        'herb_collector': {
            id: 'herb_collector',
            name: 'Kräutersammlerin Greta',
            icon: '🌿',
            dialogs: {
                'default': {
                    text: '*sortiert getrocknete Pflanzen* Was willst du? Ich handle nicht mit Fremden.',
                    options: [
                        { text: 'Marcus der Heiler schickt mich.', next: 'marcus_mention', condition: () => Player.flags.healer_quest_started },
                        { text: 'Ich suche Heilkräuter.', next: 'no_herbs' },
                        { text: 'Entschuldigung.', next: null }
                    ]
                },
                'marcus_mention': {
                    text: '*erstarrt* Marcus? *ihre Augen werden feucht* Der Mann der meinen Sohn getötet hat? Was will ER von mir?',
                    options: [
                        { text: 'Er ist krank. Er stirbt.', next: 'marcus_dying' },
                        { text: 'Er bittet um Vergebung.', next: 'forgiveness' }
                    ]
                },
                'marcus_dying': {
                    text: '*zögert* Stirbt? *schweigt lange* Als mein Junge starb... habe ich mir gewünscht dass Marcus leidet wie ich. Aber jetzt... *schüttelt den Kopf* ...der Hass vergiftet nur mich selbst.',
                    options: [
                        { text: 'Er bereut es. Jeden Tag.', next: 'forgiveness' },
                        { text: 'Ihr könntet ihm verzeihen.', next: 'forgiveness' }
                    ]
                },
                'forgiveness': {
                    text: '*Tränen laufen* Mein Sohn... er wäre nicht stolz auf mich. Er war so ein gutherziger Junge. *wischt sich die Augen* Hier. *gibt dir Kräuter* Sag Marcus... sag ihm ich vergebe ihm. Und mir selbst.',
                    options: [
                        { text: '[Heilkräuter erhalten] Ich richte es aus.', next: null, action: 'receive_herbs' }
                    ]
                },
                'no_herbs': {
                    text: '*schüttelt den Kopf* Meine Kräuter sind nicht zum Verkauf. Sie sind für... *zögert* ...für Notfälle.',
                    options: [
                        { text: 'Verstehe.', next: null }
                    ]
                },
                'after_quest': {
                    text: '*lächelt traurig* Du hast mir geholfen den Frieden zu finden. Danke. Ich... ich denke ich werde Marcus bald besuchen.',
                    options: [
                        { text: 'Das würde ihn freuen.', next: null }
                    ]
                }
            }
        },
        // ===== Einfache Lore-NPCs (keine Quests) =====
        'hungry_beggar': {
            id: 'hungry_beggar',
            name: 'Ausgehungerter Bettler',
            icon: '🧎',
            dialogs: {
                'default': {
                    text: '*streckt eine knochige Hand aus* Bitte... ein paar Münzen für Brot? Ich habe seit drei Tagen nichts gegessen.',
                    options: [
                        { text: '[5 Gold geben]', next: 'grateful', action: 'give_beggar_gold', condition: () => Player.gold >= 5 },
                        { text: 'Wie ist es so weit gekommen?', next: 'backstory' },
                        { text: 'Tut mir leid.', next: null }
                    ]
                },
                'backstory': {
                    text: '*seufzt* Ich war Bäcker. Hatte einen Laden am Marktplatz. *blickt in die Ferne* Dann kamen die Untoten. Haben alles zerstört. Meine Frau... *schweigt* ...nur ich bin übrig.',
                    options: [
                        { text: '[5 Gold geben]', next: 'grateful', action: 'give_beggar_gold', condition: () => Player.gold >= 5 },
                        { text: 'Das tut mir leid.', next: null }
                    ]
                },
                'grateful': {
                    text: '*Tränen in den Augen* Die Götter segnen dich, Fremder! Du bist der erste seit Wochen der mir hilft. *nimmt das Gold* Vielleicht gibt es doch noch gute Menschen.',
                    options: [
                        { text: 'Pass auf dich auf.', next: null }
                    ]
                }
            }
        },
        'traumatized_guard': {
            id: 'traumatized_guard',
            name: 'Verstörter Wächter',
            icon: '🛡️',
            dialogs: {
                'default': {
                    text: '*starrt ins Leere* Überall Augen... tote Augen... sie schauen mich an... *zittert*',
                    options: [
                        { text: 'Seid Ihr in Ordnung?', next: 'ptsd' },
                        { text: 'Was ist passiert?', next: 'what_happened' }
                    ]
                },
                'ptsd': {
                    text: '*lacht hohl* In Ordnung? *zeigt auf seine Rüstung* Siehst du das Blut? Ich kann es nicht abwaschen. Es ist nicht da, aber ich SEHE es. Jeden Tag. Jede Nacht.',
                    options: [
                        { text: 'Was ist passiert?', next: 'what_happened' },
                        { text: 'Es wird besser werden.', next: 'false_hope' }
                    ]
                },
                'what_happened': {
                    text: '*zittert* Der Überfall auf Grauhain. Ich war dort. Dreihundert Untote gegen fünfzig Wächter. *schließt die Augen* Ich habe zugesehen wie sie meine Kameraden... *bricht ab* ...ich bin der Einzige der überlebt hat.',
                    options: [
                        { text: 'Es tut mir leid.', next: 'alone' },
                        { text: 'Ihr habt überlebt. Das zählt.', next: 'survivor' }
                    ]
                },
                'false_hope': {
                    text: '*schüttelt den Kopf* Nein. Das wird es nicht. Nicht solange ER dort im Norden sitzt. Nicht solange seine Armee wächst. *greift nach seinem Schwert* Eines Tages... eines Tages räche ich sie alle.',
                    options: [
                        { text: 'Ihr seid mutig.', next: null }
                    ]
                },
                'alone': {
                    text: '*nickt langsam* Manchmal wünschte ich, ich wäre es nicht. Die Schuld... *starrt wieder ins Leere* ...warum ich? Warum habe ausgerechnet ICH überlebt?',
                    options: [
                        { text: 'Vielleicht habt Ihr noch eine Aufgabe.', next: null }
                    ]
                },
                'survivor': {
                    text: '*bitter* Zählt es? Ich bin ein Feigling der geflohen ist während andere starben. *senkt den Kopf* Ein Held wäre mit ihnen gestorben.',
                    options: [
                        { text: 'Ein Held kämpft weiter. Für sie.', next: null }
                    ]
                }
            }
        },
        'city_innkeeper': {
            id: 'city_innkeeper',
            name: 'Wirt Gregor',
            icon: '🍺',
            dialogs: {
                'default': {
                    text: '*wischt einen schmutzigen Becher* Willkommen in der "Letzten Hoffnung". Der Name ist Programm. *lacht bitter* Was darf es sein?',
                    options: [
                        { text: 'Ich möchte etwas kaufen.', next: 'city_inn_shop' },
                        { text: 'Wisst Ihr etwas über die Kanalisation?', next: 'sewer_info', condition: () => Player.flags.merchant_quest_started },
                        { text: 'Was könnt Ihr mir über die Stadt erzählen?', next: 'city_info' },
                        { text: 'Wie geht es den Leuten hier?', next: 'hunger_times' },
                        { text: 'Habt Ihr Gerüchte gehört?', next: 'murderer_rumor', condition: () => Player.flags.medicine_quest_done && !Player.flags.grimm_dead }
                    ]
                },
                'city_inn_shop': {
                    text: () => `*seufzt* Nicht viel da, aber... (Euer Gold: ${Player.gold})`,
                    options: [
                        { text: 'Dünnes Bier (5 Gold)', next: 'city_inn_shop', action: 'buy_beer_city' },
                        { text: 'Altes Brot (4 Gold)', next: 'city_inn_shop', action: 'buy_bread_city' },
                        { text: '[Schlafen - 20 Gold]', next: null, action: 'sleep_city_inn', condition: () => Player.gold >= 20 },
                        { text: 'Zurück', next: null }
                    ]
                },
                'sewer_info': {
                    text: '*verzieht das Gesicht* Die Kanalisation? Der Eingang ist in meinem Hinterzimmer. Aber ich warne Euch - dort unten ist es gefährlich. Ratten so groß wie Hunde. Und schlimmeres.',
                    options: [
                        { text: '[In die Kanalisation gehen]', next: null, action: 'enter_sewer' },
                        { text: 'Ich bin vorsichtig.', next: null }
                    ]
                },
                'city_info': {
                    text: 'Grauenfels war einst die größte Handelsstadt im Süden. Jetzt... *seufzt* Die Hälfte der Bevölkerung ist geflohen oder tot. Die andere Hälfte trinkt hier um zu vergessen.',
                    options: [
                        { text: 'Was wisst Ihr über den Schattenfürst?', next: 'shadow_info' },
                        { text: 'Verstehe.', next: null }
                    ]
                },
                'shadow_info': {
                    text: '*schaut sich um* Der Schattenfürst? *flüstert* Man sagt er war nicht immer böse. Er war Hofmagier, hat sogar den Prinzen unterrichtet. Dann... ist er verschwunden. Jahre später kam er zurück. Mit einer Armee aus Toten.',
                    options: [
                        { text: 'Er hat den Prinzen unterrichtet?', next: 'prince_info' },
                        { text: 'Interessant.', next: null }
                    ]
                },
                'prince_info': {
                    text: '*nickt* Ja. Und nicht nur den Prinzen. Es gab Gerüchte dass er auch Kinder aus anderen Adelsfamilien ausbildete. *senkt die Stimme* Eine dieser Familien... nun, man sagt sie haben ihm geholfen. Verräter aus den eigenen Reihen.',
                    options: [
                        { text: 'Welche Familie?', next: 'traitor_hint' },
                        { text: 'Das ist erschreckend.', next: null }
                    ]
                },
                'traitor_hint': {
                    text: '*schüttelt den Kopf* Das weiß niemand genau. Alle Beweise wurden vernichtet. Aber... *mustert dich* ...ihr Wappen hatte einen Raben. Schwarz auf Silber. Falls euch das etwas sagt.',
                    options: [
                        { text: '...', next: null }
                    ]
                },
                'murderer_rumor': {
                    text: '*beugt sich vor* Ach ja, fast vergessen. Es gibt da einen Kerl der hier öfter trinkt. Nennt sich Grimm. *senkt die Stimme* Er prahlt ständig damit dass er für den Schattenfürst arbeitet. Hat letzte Woche behauptet er hätte zwei Leute im Wald umgebracht - einem den Kopf abgehackt und einen erstochen.',
                    options: [
                        { text: 'Wo finde ich diesen Grimm?', next: 'grimm_location' },
                        { text: 'Das ist interessant...', next: null }
                    ]
                },
                'grimm_location': {
                    text: 'Er hängt meistens in der Gasse hinter der Taverne rum. *warnt* Aber sei vorsichtig - der Kerl ist gefährlich. Und er hat Freunde. Wenn du ihn konfrontierst, erwarte Ärger.',
                    options: [
                        { text: 'Ich werde vorsichtig sein.', next: null, action: 'unlock_alley' }
                    ]
                },
                'hunger_times': {
                    text: '*seufzt* Die Zeiten sind hart. Mein Vorrat wird täglich kleiner. Die Lieferungen aus dem Süden kommen nicht mehr durch - zu viele Untote auf den Straßen. Viele meiner Stammgäste können sich nicht mal mehr ein Bier leisten.',
                    options: [
                        { text: 'Wie überleben die Leute?', next: 'survival' },
                        { text: 'Das tut mir leid.', next: null }
                    ]
                },
                'survival': {
                    text: '*schüttelt den Kopf* Die meisten kratzen gerade so genug zusammen. Ein paar mutige Jäger wagen sich noch in die Wälder. Aber viele verhungern einfach. *verzieht das Gesicht* Ich hab schon die Preise erhöht um wenigstens noch etwas zu haben.',
                    options: [
                        { text: 'Verstehe.', next: null }
                    ]
                }
            }
        },
        'bounty_hunter': {
            id: 'bounty_hunter',
            name: 'Kopfgeldjäger Raven',
            icon: '🏹',
            dialogs: {
                'default': {
                    text: '*schärft einen Dolch ohne aufzusehen* Du hast das Aussehen von jemandem der Ärger sucht. Oder von Ärger gefunden wird. *blickt auf* Was willst du?',
                    options: [
                        { text: 'Habt Ihr Arbeit für mich?', next: 'bounty_quest', condition: () => !Player.flags.bounty_quest_done },
                        { text: 'Was wisst Ihr über die Gegend?', next: 'area_info' },
                        { text: 'Nichts, Entschuldigung.', next: null }
                    ]
                },
                'bounty_quest': {
                    text: '*grinst* Tatsächlich ja. In den Ruinen westlich der Stadt gibt es Geister. Normalerweise kein Problem, aber einer davon ist... besonders. Ein ehemaliger Adliger, der als Geist weiterspukt. Töte ihn und ich zahle gut.',
                    options: [
                        { text: 'Wie viel?', next: 'bounty_reward' },
                        { text: 'Das klingt gefährlich.', next: null }
                    ]
                },
                'bounty_reward': {
                    text: '100 Gold und meine Empfehlung bei der Kopfgeldjäger-Gilde. Das kann in diesen Zeiten mehr wert sein als Gold. *steckt den Dolch weg* Also, bist du dabei?',
                    options: [
                        { text: 'Ich bin dabei.', next: null, action: 'start_bounty_quest' },
                        { text: 'Ich überlege es mir.', next: null }
                    ]
                },
                'waiting_bounty': {
                    text: '*schaut auf* Hast du den Geist in den Ruinen erledigt?',
                    options: [
                        { text: '[Auftrag abschließen]', next: 'bounty_complete', condition: () => Player.flags.ruins_ghost1_dead && Player.flags.ruins_ghost2_dead, action: 'complete_bounty_quest' },
                        { text: 'Noch nicht.', next: null }
                    ]
                },
                'bounty_complete': {
                    text: '*nickt anerkennend* Nicht schlecht. Du bist besser als du aussiehst. *wirft dir einen Beutel zu* Hier ist dein Gold. Und wenn du mehr Arbeit suchst - merk dir den Namen Raven.',
                    options: [
                        { text: '[100 Gold erhalten]', next: null }
                    ]
                },
                'after_quest': {
                    text: '*nickt dir zu* Du hast dich bewährt. Falls du jemals der Gilde beitreten willst - ich könnte ein Wort für dich einlegen.',
                    options: [
                        { text: 'Danke.', next: null }
                    ]
                },
                'area_info': {
                    text: 'Diese Gegend? Gefährlich. Monster in jedem Winkel. *zeigt nach Westen* Die Ruinen sind voll mit Untoten. *zeigt nach Norden* Die Kathedrale ist noch schlimmer - dort lauern die Entweihten Priester. Vermeide sie wenn du kannst.',
                    options: [
                        { text: 'Danke für die Warnung.', next: null }
                    ]
                }
            }
        },
        'mysterious_man': {
            id: 'mysterious_man',
            name: 'Vermummter Mann',
            icon: '🎭',
            dialogs: {
                'default': {
                    text: '*sitzt in der dunkelsten Ecke* Du... *mustert dich* Die Seherin hat dich geschickt, nicht wahr? Ich habe auf jemanden wie dich gewartet.',
                    options: [
                        { text: 'Wer seid Ihr?', next: 'identity' },
                        { text: 'Woher wisst Ihr das?', next: 'knowledge' }
                    ]
                },
                'identity': {
                    text: '*lacht leise* Wer ich bin ist unwichtig. Wichtiger ist wer DU bist. *beugt sich vor* Du erinnerst dich nicht, oder? An dein altes Leben. An deine Familie. An das was du getan hast.',
                    options: [
                        { text: 'Was wisst Ihr über mich?', next: 'about_player' },
                        { text: 'Ich habe nichts getan!', next: 'denial' }
                    ]
                },
                'knowledge': {
                    text: '*zieht die Kapuze tiefer* Die Seherin sieht viel. Aber nicht alles. *pause* Ich war dabei, weißt du. In jener Nacht. Der Nacht des Blutes.',
                    options: [
                        { text: 'Was wisst Ihr über mich?', next: 'about_player' },
                        { text: 'Ihr wart dabei?', next: 'witness_story' }
                    ]
                },
                'about_player': {
                    text: '*flüstert* Du bist nicht der erste der zurückkommt. Es gibt andere... die vom Tod erweckt wurden. Der Schattenfürst experimentiert. Aber bei dir... *zögert* ...bei dir war es anders. Du wurdest nicht von ihm zurückgebracht.',
                    options: [
                        { text: 'Von wem dann?', next: 'who_brought_back' },
                        { text: 'Wie wisst Ihr das?', next: 'how_know' }
                    ]
                },
                'who_brought_back': {
                    text: '*steht auf* Diese Antwort... findest du in der nächsten Stadt. Steinwacht. Such nach einem Mann namens Aldric. Er war... *zögert* ...er hat für deine Familie gearbeitet. Er weiß mehr als ich.',
                    options: [
                        { text: 'Meine Familie?', next: 'family_hint' },
                        { text: 'Wo ist Steinwacht?', next: 'steinwacht_direction' }
                    ]
                },
                'family_hint': {
                    text: '*wendet sich ab* Die Familie mit dem Raben-Wappen. *geht zur Tür* Du wirst die Wahrheit nicht mögen. Aber du musst sie finden. *dreht sich um* Und wenn du sie findest... erinnere dich daran, dass nicht alle in deiner Familie böse waren.',
                    options: [
                        { text: '...', next: null }
                    ]
                },
                'denial': {
                    text: '*lächelt traurig* Das glaube ich dir. DU hast vielleicht nichts getan. Aber deine Familie... *schüttelt den Kopf* Geh nach Steinwacht. Such Aldric. Er wird dir alles erklären.',
                    options: [
                        { text: 'Wo ist Steinwacht?', next: 'steinwacht_direction' }
                    ]
                },
                'witness_story': {
                    text: '*setzt sich wieder* Ich war ein Diener im Schloss. Ich habe die Toten gesehen. Die Armee aus Leichen die durch die Gänge marschierte. *zittert* Und ich habe die Verräter gesehen. Die Familie die die Türen öffnete.',
                    options: [
                        { text: 'Welche Familie?', next: 'family_hint' }
                    ]
                },
                'how_know': {
                    text: 'Weil der Schattenfürst seine Kreaturen kontrolliert. Sie gehorchen ihm blind. Aber du... *mustert dich* ...du hast einen freien Willen. Das bedeutet jemand anderes hat dich zurückgebracht. Jemand mit anderer Magie.',
                    options: [
                        { text: 'Wer könnte das sein?', next: 'who_brought_back' }
                    ]
                },
                'steinwacht_direction': {
                    text: 'Östlich von hier. Mehrere Tagesreisen. *gibt dir etwas* Hier, nimm diesen Ring. Zeig ihn Aldric. Er wird wissen dass ich dich geschickt habe.',
                    options: [
                        { text: '[Ring annehmen]', next: null, action: 'receive_signet_ring' }
                    ]
                }
            }
        },
        
        // ===== GRIMM - THE MURDERER =====
        'grimm': {
            id: 'grimm',
            name: 'Grimm der Schlächter',
            icon: '💀',
            dialogs: {
                'default': {
                    text: '*dreht sich um, ein hässliches Grinsen im Gesicht* Na, wen haben wir denn da? *mustert dich* Du kommst mir bekannt vor... *lacht* Warte mal. Die Narbe auf deiner Brust. Du... du bist UNMÖGLICH am Leben!',
                    options: [
                        { text: 'Du hast mich getötet?', next: 'confession' },
                        { text: 'Erkennst du mich?', next: 'recognition' }
                    ]
                },
                'confession': {
                    text: '*tritt einen Schritt zurück* Ich hab dich ERSTOCHEN! Direkt durchs Herz! Und deinem Bruder hab ich den Kopf abgehackt! Ihr wolltet den Meister verraten - IHR wart Verräter an eurem eigenen Blut! *zieht sein Schwert* Diesmal bleibst du tot!',
                    options: [
                        { text: '[KAMPF] Du wirst für deine Taten bezahlen!', next: null, action: 'fight_grimm' }
                    ]
                },
                'recognition': {
                    text: '*wird bleich* Du... du bist einer von den Rabenstein-Kindern. Der mittlere Sohn! *lacht nervös* Der Meister wird begeistert sein zu hören dass du noch lebst... oder nicht. *zieht sein Schwert* Ich denke ich erledige dich nochmal - diesmal richtig!',
                    options: [
                        { text: '[KAMPF] Ich bin bereit!', next: null, action: 'fight_grimm' }
                    ]
                }
            }
        },
        
        // ===== STEINWACHT NPCs =====
        'steinwacht_guard': {
            id: 'steinwacht_guard',
            name: 'Torwächter',
            icon: '💂',
            dialogs: {
                'default': {
                    text: '*mustert dich misstrauisch* Halt! Was führt Euch nach Steinwacht, Fremder? Die Zeiten sind gefährlich - wir lassen nicht jeden rein.',
                    options: [
                        { text: 'Ich suche jemanden namens Aldric.', next: 'aldric_info', condition: () => Player.hasItem('signet_ring') },
                        { text: 'Ich bin nur ein Reisender.', next: 'traveler' },
                        { text: 'Ist die Stadt sicher?', next: 'safety' }
                    ]
                },
                'aldric_info': {
                    text: '*sieht den Ring* Dieser Ring... *nickt* Ihr seid also von IHM geschickt. Aldric lebt am Marktplatz. Ein alter Mann, aber einer der Wenigen die die Wahrheit kennen. Geht mit Gott.',
                    options: [
                        { text: 'Danke.', next: null }
                    ]
                },
                'traveler': {
                    text: '*seufzt* Na gut. Wir können jeden Handel gebrauchen den wir kriegen können. Aber haltet Euch aus Ärger raus - wir haben hier schon genug Probleme.',
                    options: [
                        { text: 'Was für Probleme?', next: 'problems' },
                        { text: 'Verstanden.', next: null }
                    ]
                },
                'safety': {
                    text: 'Sicherer als Grauenfels, das ist gewiss. Unsere Mauern sind stark und wir haben noch Soldaten. Aber die Untoten kommen näher... jeden Tag mehr.',
                    options: [
                        { text: 'Danke für die Info.', next: null }
                    ]
                },
                'problems': {
                    text: '*senkt die Stimme* Spione des Schattenfürsts. Wir haben letzte Woche einen gefangen. Er sagte aus bevor er... nun ja. Es gibt Pläne für einen Angriff. Seid vorsichtig wem Ihr vertraut.',
                    options: [
                        { text: 'Danke für die Warnung.', next: null }
                    ]
                }
            }
        },
        'aldric': {
            id: 'aldric',
            name: 'Der alte Aldric',
            icon: '👴',
            dialogs: {
                'default': {
                    text: '*sieht dich mit müden Augen an* Kann ich Euch... *erstarrt* Bei allen Göttern. *fasst sich ans Herz* Ich... ich kenne dieses Gesicht. Aber das kann nicht sein...',
                    options: [
                        { text: '[Siegelring zeigen] Man hat mir gesagt Ihr kennt die Wahrheit.', next: 'ring_shown', condition: () => Player.hasItem('signet_ring') },
                        { text: 'Wer bin ich?', next: 'identity_question' }
                    ]
                },
                'ring_shown': {
                    text: '*nimmt den Ring mit zitternden Händen* Das ist der Ring des Vermummten... er hat dich also geschickt. *setzt sich schwer* Du bist... du bist der mittlere Sohn der Familie Rabenstein. Ich war euer Diener. Ich habe dich aufwachsen sehen.',
                    options: [
                        { text: 'Rabenstein? Was ist mit meiner Familie passiert?', next: 'family_story' },
                        { text: 'Wer hat mich getötet?', next: 'killer_info' }
                    ]
                },
                'identity_question': {
                    text: '*schüttelt den Kopf* Ohne Beweis kann ich nicht... es wäre zu gefährlich. Bringt mir etwas das beweist wer Ihr seid. *zögert* Im Stadtarchiv gibt es Familienregister. Der Archivar Benedikt könnte Euch helfen - gegen die richtige Bezahlung.',
                    options: [
                        { text: 'Wo finde ich das Archiv?', next: 'archive_info' },
                        { text: 'Verstehe.', next: null }
                    ]
                },
                'family_story': {
                    text: '*seufzt schwer* Die Rabensteins dienten dem Schattenfürst seit Generationen. Aber drei der Kinder - du, dein Bruder Korvin und deine Schwester Elara - ihr habt euch gegen ihn aufgelehnt. *Tränen* Korvin und du wurdet im Wald hingerichtet. Elara... sie wurde gefangengenommen.',
                    options: [
                        { text: 'Der Kopf neben mir... das war Korvin?', next: 'brother_confirm' },
                        { text: 'Wo ist meine Schwester?', next: 'sister_location' }
                    ]
                },
                'brother_confirm': {
                    text: '*nickt langsam* Ja. Korvin, dein älterer Bruder. Grimm der Schlächter hat ihm den Kopf abgehackt und dich erstochen. *wischt sich die Augen* Ich verstehe nicht wie du noch lebst. Aber... ich bin froh dass du es tust.',
                    options: [
                        { text: 'Grimm ist tot. Ich habe mich gerächt.', next: 'grimm_dead', condition: () => Player.flags.grimm_dead },
                        { text: 'Wo ist meine Schwester?', next: 'sister_location' }
                    ]
                },
                'grimm_dead': {
                    text: '*atmet tief ein* Grimm ist tot? *lächelt zum ersten Mal* Dann hat Korvin endlich Frieden. *steht auf* Aber deine Arbeit ist nicht getan. Deine Schwester Elara ist noch am Leben - gefangen in der Festung des Schattenfürsts.',
                    options: [
                        { text: 'Ich muss sie retten.', next: 'sister_rescue' }
                    ]
                },
                'sister_location': {
                    text: 'Elara... *senkt den Kopf* Sie wird in der dritten großen Stadt festgehalten - Rabenfels, die Festungsstadt. Der Schattenfürst hält sie als Geisel. Vielleicht als Druckmittel gegen andere die sich auflehnen wollen.',
                    options: [
                        { text: 'Ich werde sie befreien.', next: 'sister_rescue' }
                    ]
                },
                'sister_rescue': {
                    text: '*greift deinen Arm* Sei vorsichtig! Die Festung ist stark bewacht. Aber... *zögert* ...es gibt einen geheimen Weg hinein. Im Archiv dieser Stadt gibt es alte Baupläne. Der Archivar Benedikt schuldet mir einen Gefallen - sagt ihm ich schicke euch.',
                    options: [
                        { text: 'Danke, Aldric.', next: null, action: 'unlock_archive' }
                    ]
                },
                'killer_info': {
                    text: 'Ein Mann namens Grimm. Man nennt ihn "den Schlächter". Er arbeitet für den Schattenfürst als... Auftragsmörder. *verzieht das Gesicht* Ein widerlicher Mensch. Er hat damit geprahlt euch getötet zu haben.',
                    options: [
                        { text: 'Grimm ist bereits tot.', next: 'grimm_dead', condition: () => Player.flags.grimm_dead },
                        { text: 'Wo finde ich ihn?', next: 'grimm_location_aldric', condition: () => !Player.flags.grimm_dead }
                    ]
                },
                'grimm_location_aldric': {
                    text: 'Zuletzt wurde er in Grauenfels gesehen. Er hängt dort in einer Taverne herum und prahlt mit seinen "Heldentaten". *spuckt aus* Wenn du ihn findest... räche deinen Bruder.',
                    options: [
                        { text: 'Das werde ich.', next: null }
                    ]
                },
                'archive_info': {
                    text: 'Das Archiv ist westlich vom Marktplatz. Aber Benedikt ist... eigen. Er lässt nicht jeden die alten Dokumente sehen. *zögert* Sagt ihm Aldric schickt euch. Das sollte helfen.',
                    options: [
                        { text: 'Verstanden.', next: null, action: 'unlock_archive' }
                    ]
                },
                'after_revelation': {
                    text: '*nickt dir zu* Du weißt jetzt die Wahrheit. Was du damit machst, liegt bei dir. Aber vergiss nicht - deine Schwester wartet.',
                    options: [
                        { text: 'Ich werde sie finden.', next: null }
                    ]
                }
            }
        },
        'steinwacht_merchant': {
            id: 'steinwacht_merchant',
            name: 'Krämer Wilhelm',
            icon: '🧔',
            dialogs: {
                'default': {
                    text: '*ordnet seine Waren* Willkommen, Fremder! In diesen dunklen Zeiten ist jeder Kunde willkommen. Was darf es sein?',
                    options: [
                        { text: 'Was habt Ihr zu verkaufen?', next: 'shop' },
                        { text: 'Was wisst Ihr über die Stadt?', next: 'city_info' }
                    ]
                },
                'shop': {
                    text: () => `Hier ist mein Angebot. (Euer Gold: ${Player.gold})`,
                    options: [
                        { text: 'Großer Heiltrank (50 Gold)', next: 'shop', action: 'buy_large_health_steinwacht' },
                        { text: 'Manatrank (25 Gold)', next: 'shop', action: 'buy_mana_steinwacht' },
                        { text: 'Brot (8 Gold)', next: 'shop', action: 'buy_bread_steinwacht' },
                        { text: 'Zurück', next: null }
                    ]
                },
                'city_info': {
                    text: 'Steinwacht ist eine der letzten freien Städte. Unsere Mauern haben schon drei Angriffe der Untoten abgewehrt. *seufzt* Aber wie lange noch? Jeden Monat kommen mehr.',
                    options: [
                        { text: 'Danke für die Info.', next: null }
                    ]
                }
            }
        },
        'steinwacht_old_woman': {
            id: 'steinwacht_old_woman',
            name: 'Alte Martha',
            icon: '👵',
            dialogs: {
                'default': {
                    text: '*murmelt vor sich hin* Die dunklen Zeiten... die dunklen Zeiten kommen... *sieht dich* Oh! Ein Fremder. *mustert dich genau* Du hast den Geruch des Todes an dir, junger Mann.',
                    options: [
                        { text: 'Was meint Ihr damit?', next: 'death_smell' },
                        { text: 'Seid Ihr in Ordnung?', next: 'fine' }
                    ]
                },
                'death_smell': {
                    text: '*tippt sich an die Nase* Ich rieche es. Du warst tot - und bist zurückgekommen. *lacht* Keine Sorge, ich verrate niemanden. Aber... *wird ernst* ...sei vorsichtig. Der Schattenfürst spürt wenn jemand von den Toten erwacht ohne sein Zutun.',
                    options: [
                        { text: 'Woher wisst Ihr das?', next: 'knowledge' },
                        { text: 'Danke für die Warnung.', next: null }
                    ]
                },
                'knowledge': {
                    text: '*grinst zahnlos* Ich war nicht immer eine alte Frau auf dem Marktplatz. Vor langer Zeit... war ich eine Heilerin am Königshof. Ich habe Dinge gesehen. *wird traurig* Schreckliche Dinge.',
                    options: [
                        { text: 'Was für Dinge?', next: 'court_secrets' },
                        { text: 'Verstehe.', next: null }
                    ]
                },
                'court_secrets': {
                    text: '*flüstert* Der Schattenfürst war nicht immer böse. Er war verliebt - in eine Frau die ihn nicht wollte. Als sie starb... *zittert* ...hat er versucht sie zurückzubringen. Das war der Anfang seines Falls in die Dunkelheit.',
                    options: [
                        { text: 'Das ist tragisch.', next: null }
                    ]
                },
                'fine': {
                    text: '*lacht* So gut wie man in meinem Alter sein kann, Kind. Lauf nur weiter - du hast wichtigere Dinge zu tun als mit einer alten Frau zu plaudern.',
                    options: [
                        { text: 'Lebt wohl.', next: null }
                    ]
                }
            }
        },
        'steinwacht_blacksmith': {
            id: 'steinwacht_blacksmith',
            name: 'Meisterschmied Torben',
            icon: '🔨',
            dialogs: {
                'default': {
                    text: '*hält inne beim Hämmern* Ein Kunde! Willkommen in meiner Schmiede. Ich fertige die besten Waffen südlich der Berge - wenn ich das so sagen darf.',
                    options: [
                        { text: 'Was habt Ihr zu verkaufen?', next: 'shop' },
                        { text: 'Könnt Ihr meine Ausrüstung verbessern?', next: 'upgrade' }
                    ]
                },
                'shop': {
                    text: () => `Hier ist mein Angebot. Nur das Beste! (Euer Gold: ${Player.gold})`,
                    options: [
                        { text: 'Stahlschwert (120 Gold, +12 Schaden)', next: 'shop', action: 'buy_steel_sword', condition: () => !Player.flags.bought_steel_sword },
                        { text: 'Verstärkter Schild (80 Gold, +6 Verteidigung)', next: 'shop', action: 'buy_reinforced_shield', condition: () => !Player.flags.bought_reinforced_shield },
                        { text: 'Plattenrüstung (150 Gold, +8 Verteidigung)', next: 'shop', action: 'buy_plate_armor', condition: () => !Player.flags.bought_plate_armor },
                        { text: 'Zurück', next: null }
                    ]
                },
                'upgrade': {
                    text: '*schaut auf deine Ausrüstung* Hm, nicht schlecht was du da hast. Aber ich könnte es verbessern - für den richtigen Preis natürlich. Komm wieder wenn du bessere Materialien hast.',
                    options: [
                        { text: 'Verstanden.', next: null }
                    ]
                }
            }
        },
        'archivist': {
            id: 'archivist',
            name: 'Archivar Benedikt',
            icon: '📚',
            dialogs: {
                'default': {
                    text: '*blickt von seinen Büchern auf* Das Archiv ist nicht für die Öffentlichkeit zugänglich. Was wollt Ihr hier?',
                    options: [
                        { text: 'Aldric schickt mich.', next: 'aldric_sent', condition: () => Player.flags.archive_unlocked },
                        { text: 'Ich suche Information über eine Familie.', next: 'family_search' },
                        { text: 'Entschuldigung, ich gehe.', next: null }
                    ]
                },
                'aldric_sent': {
                    text: '*entspannt sich* Aldric? *nickt* Dann seid Ihr kein gewöhnlicher Fremder. Was sucht Ihr?',
                    options: [
                        { text: 'Die Familie Rabenstein.', next: 'rabenstein_info' },
                        { text: 'Baupläne der Festung Rabenfels.', next: 'fortress_plans' }
                    ]
                },
                'family_search': {
                    text: '*misstrauisch* Familienforschung in diesen Zeiten? *seufzt* Es kostet 50 Gold und ich entscheide was Ihr sehen dürft.',
                    options: [
                        { text: '[50 Gold zahlen]', next: 'paid_search', condition: () => Player.gold >= 50, action: 'pay_archivist' },
                        { text: 'Das ist zu teuer.', next: null }
                    ]
                },
                'paid_search': {
                    text: '*nimmt das Gold* Na gut. Welche Familie interessiert Euch?',
                    options: [
                        { text: 'Rabenstein.', next: 'rabenstein_info' }
                    ]
                },
                'rabenstein_info': {
                    text: '*wird blass* Die Rabensteins? *senkt die Stimme* Eine gefährliche Familie. Sie dienten dem Schattenfürst seit Generationen. Die Familienregister sind dort drüben - aber seid vorsichtig was Ihr findet.',
                    options: [
                        { text: '[Register durchsuchen]', next: null, action: 'allow_records_search' }
                    ]
                },
                'fortress_plans': {
                    text: '*schaut sich nervös um* Die Festung Rabenfels? Das sind hochgeheime Dokumente! *zögert* Aber... wenn Aldric Euch schickt... *holt eine Schriftrolle* Hier. Die alten Baupläne. Es gibt einen geheimen Eingang durch die alten Minen.',
                    options: [
                        { text: '[Pläne nehmen]', next: null, action: 'receive_fortress_plans' }
                    ]
                }
            }
        },
        // ===== TRAINERS =====
        'sword_master': {
            id: 'sword_master',
            name: 'Ritter Gareth',
            icon: '⚔️',
            dialogs: {
                'default': {
                    text: '*schwingt sein Übungsschwert* Ein weiterer der das Schwert meistern will? Ich war einst Hauptmann der königlichen Garde. *mustert dich* Du hast Potential. Willst du lernen?',
                    options: [
                        { text: 'Was könnt Ihr mir beibringen?', next: 'training_options' },
                        { text: 'Erzählt mir von der königlichen Garde.', next: 'guard_story' },
                        { text: 'Nicht jetzt.', next: null }
                    ]
                },
                'training_options': {
                    text: () => `Ich kann dich im Schwertkampf unterweisen. Jede Stufe erhöht deinen Schaden permanent. Du bist aktuell auf Stufe ${Player.flags.sword_training || 0}. (Dein Level: ${Player.level})`,
                    options: [
                        { text: 'Stufe 1: Grundlagen (50 Gold, Level 3)', next: 'train_sword_1', condition: () => !Player.flags.sword_training && Player.level >= 3 && Player.gold >= 50 },
                        { text: 'Stufe 2: Fortgeschritten (100 Gold, Level 5)', next: 'train_sword_2', condition: () => Player.flags.sword_training === 1 && Player.level >= 5 && Player.gold >= 100 },
                        { text: 'Stufe 3: Experte (200 Gold, Level 8)', next: 'train_sword_3', condition: () => Player.flags.sword_training === 2 && Player.level >= 8 && Player.gold >= 200 },
                        { text: 'Stufe 4: Meister (400 Gold, Level 12)', next: 'train_sword_4', condition: () => Player.flags.sword_training === 3 && Player.level >= 12 && Player.gold >= 400 },
                        { text: 'Zurück', next: null }
                    ]
                },
                'train_sword_1': {
                    text: '*zeigt dir die Grundhaltung* Füße schulterbreit, Schwert in beiden Händen. Gut! Du lernst schnell.',
                    options: [
                        { text: '[Stufe 1 lernen: +2 Schaden]', next: null, action: 'learn_sword_1' }
                    ]
                },
                'train_sword_2': {
                    text: '*führt komplexere Manöver vor* Jetzt lernst du Riposten und Konterangriffe. Das wird deine Feinde überraschen.',
                    options: [
                        { text: '[Stufe 2 lernen: +3 Schaden]', next: null, action: 'learn_sword_2' }
                    ]
                },
                'train_sword_3': {
                    text: '*sein Blick wird ernst* Nun zeige ich dir Techniken die nur die Elite beherrscht. Schwertwirbel, präzise Stiche, tödliche Kombinationen.',
                    options: [
                        { text: '[Stufe 3 lernen: +4 Schaden]', next: null, action: 'learn_sword_3' }
                    ]
                },
                'train_sword_4': {
                    text: '*legt sein Schwert nieder* Du hast alles gelernt was ich dir beibringen kann. Von nun an bist du ein Meister des Schwertes. *verbeugt sich* Es war mir eine Ehre.',
                    options: [
                        { text: '[Meister werden: +5 Schaden]', next: null, action: 'learn_sword_4' }
                    ]
                },
                'guard_story': {
                    text: '*seufzt* Die königliche Garde... wir haben den König beschützt. Oder es versucht. *ballt die Faust* In der Nacht des Blutes haben wir versagt. Die Untoten überrannten uns. Ich bin einer der wenigen Überlebenden.',
                    options: [
                        { text: 'Das tut mir leid.', next: null }
                    ]
                }
            }
        },
        'bow_master': {
            id: 'bow_master',
            name: 'Jäger Roland',
            icon: '🏹',
            dialogs: {
                'default': {
                    text: '*spannt seinen Bogen und schießt ins Schwarze* Du siehst aus als könntest du Unterricht gebrauchen. Ich bin der beste Bogenschütze diesseits der Berge.',
                    options: [
                        { text: 'Könnt Ihr mich trainieren?', next: 'bow_training' },
                        { text: 'Kennt Ihr Euch mit der Jagd aus?', next: 'hunt_training' },
                        { text: 'Nicht jetzt.', next: null }
                    ]
                },
                'bow_training': {
                    text: () => `Bogenschießen erfordert Geduld und Präzision. Jede Stufe erhöht deinen Bogen-Schaden. Du bist auf Stufe ${Player.flags.bow_training || 0}. (Level: ${Player.level})`,
                    options: [
                        { text: 'Stufe 1: Zielen (50 Gold, Level 3)', next: 'train_bow_1', condition: () => !Player.flags.bow_training && Player.level >= 3 && Player.gold >= 50 },
                        { text: 'Stufe 2: Schnellschuss (100 Gold, Level 5)', next: 'train_bow_2', condition: () => Player.flags.bow_training === 1 && Player.level >= 5 && Player.gold >= 100 },
                        { text: 'Stufe 3: Präzision (200 Gold, Level 8)', next: 'train_bow_3', condition: () => Player.flags.bow_training === 2 && Player.level >= 8 && Player.gold >= 200 },
                        { text: 'Stufe 4: Meisterschütze (400 Gold, Level 12)', next: 'train_bow_4', condition: () => Player.flags.bow_training === 3 && Player.level >= 12 && Player.gold >= 400 },
                        { text: 'Zurück', next: 'default' }
                    ]
                },
                'train_bow_1': {
                    text: '*korrigiert deine Haltung* Atme ruhig. Fokussiere dein Ziel. Lass los... Perfekt!',
                    options: [
                        { text: '[Stufe 1: +2 Bogen-Schaden]', next: null, action: 'learn_bow_1' }
                    ]
                },
                'train_bow_2': {
                    text: '*zeigt schnelle Bewegungen* Jetzt lernst du mehrere Pfeile in Sekunden abzufeuern. Geschwindigkeit tötet.',
                    options: [
                        { text: '[Stufe 2: +3 Bogen-Schaden]', next: null, action: 'learn_bow_2' }
                    ]
                },
                'train_bow_3': {
                    text: '*zeigt auf eine winzige Zielscheibe* Triff das Auge auf hundert Meter. Das ist wahre Präzision.',
                    options: [
                        { text: '[Stufe 3: +4 Bogen-Schaden]', next: null, action: 'learn_bow_3' }
                    ]
                },
                'train_bow_4': {
                    text: '*verbeugt sich* Du hast das Niveau eines Meisterschützen erreicht. Deine Pfeile werden Legenden schreiben.',
                    options: [
                        { text: '[Meisterschütze: +5 Bogen-Schaden]', next: null, action: 'learn_bow_4' }
                    ]
                },
                'hunt_training': {
                    text: () => `Ah, ein Jäger! Ich kann dir beibringen wie du mehr Beute von Tieren bekommst. Du bist auf Stufe ${Player.flags.hunt_training || 0}.`,
                    options: [
                        { text: 'Stufe 1: Grundlagen (30 Gold)', next: 'train_hunt_1', condition: () => !Player.flags.hunt_training && Player.gold >= 30 },
                        { text: 'Stufe 2: Effizientes Häuten (60 Gold)', next: 'train_hunt_2', condition: () => Player.flags.hunt_training === 1 && Player.gold >= 60 },
                        { text: 'Stufe 3: Meisterjäger (120 Gold)', next: 'train_hunt_3', condition: () => Player.flags.hunt_training === 2 && Player.gold >= 120 },
                        { text: 'Zurück', next: 'default' }
                    ]
                },
                'train_hunt_1': {
                    text: '*zeigt wie man sauber häutet* So verschwendest du weniger. Die Drop-Chance bei Tieren steigt.',
                    options: [
                        { text: '[+10% Tier-Drops]', next: null, action: 'learn_hunt_1' }
                    ]
                },
                'train_hunt_2': {
                    text: '*demonstriert fortgeschrittene Techniken* Jetzt holst du noch mehr aus deiner Beute.',
                    options: [
                        { text: '[+15% Tier-Drops]', next: null, action: 'learn_hunt_2' }
                    ]
                },
                'train_hunt_3': {
                    text: '*nickt zufrieden* Du weißt jetzt alles was ich weiß. Kein Tier entgeht dir mehr.',
                    options: [
                        { text: '[+25% Tier-Drops]', next: null, action: 'learn_hunt_3' }
                    ]
                }
            }
        },
        // ===== STEINWACHT LORE NPCs =====
        'war_veteran': {
            id: 'war_veteran',
            name: 'Kriegsveteran Oskar',
            icon: '🪖',
            dialogs: {
                'default': {
                    text: '*reibt seinen verstümmelten Arm* Die Schlacht von Graustein. Dort hab ich das verloren. *zeigt auf den Stumpf* Aber ich lebe. Viele meiner Kameraden nicht.',
                    options: [
                        { text: 'Was ist bei Graustein passiert?', next: 'battle_story' },
                        { text: 'Wie habt Ihr überlebt?', next: 'survival_story' }
                    ]
                },
                'battle_story': {
                    text: '*starrt in die Ferne* Dreitausend Mann gegen eine Armee aus Knochen und Verwesung. Wir dachten wir könnten gewinnen. *lacht bitter* Wir lagen falsch. Der Schattenfürst hat sie einfach... wieder aufstehen lassen. Unsere gefallenen Brüder wurden zu unseren Feinden.',
                    options: [
                        { text: 'Das ist schrecklich.', next: 'terrible' },
                        { text: 'Gibt es Hoffnung?', next: 'hope' }
                    ]
                },
                'survival_story': {
                    text: '*zeigt auf seinen fehlenden Arm* Ein Skelett hat ihn abgehackt. Ich bin unter den Leichen zusammengebrochen. Als ich aufwachte... war alles vorbei. Ich habe mich zwischen den Toten versteckt bis die Untoten abgezogen sind.',
                    options: [
                        { text: 'Ihr seid mutig.', next: null }
                    ]
                },
                'terrible': {
                    text: '*nickt* Ja. Aber das Schlimmste? Ich musste meinen eigenen Leutnant töten. Er war schon tot, aber... er lief noch. Mit leeren Augen. *zittert* Das vergesse ich nie.',
                    options: [
                        { text: 'Es tut mir leid.', next: null }
                    ]
                },
                'hope': {
                    text: '*sieht dich an* Hoffnung? *überlegt* Vielleicht. Es heißt dass einige im Widerstand kämpfen. Guerillakrieger die den Untoten in den Wäldern auflauern. *senkt die Stimme* Und es gibt Gerüchte über jemanden der von den Toten zurückgekehrt ist... aber nicht als Monster.',
                    options: [
                        { text: '...', next: null }
                    ]
                }
            }
        },
        'grieving_mother': {
            id: 'grieving_mother',
            name: 'Weinende Mutter',
            icon: '😢',
            dialogs: {
                'default': {
                    text: '*hält ein kleines Stofftier* Mein Junge... mein kleiner Junge... *schluchzt*',
                    options: [
                        { text: 'Was ist passiert?', next: 'her_story' },
                        { text: '*Sie in Ruhe lassen*', next: null }
                    ]
                },
                'her_story': {
                    text: '*wischt sich Tränen ab* Die Untoten kamen in der Nacht. Wir sind geflohen aber... *bricht zusammen* ...er war zu langsam. Ich konnte ihn nicht retten. Ich habe sein Schreien gehört während ich rannte...',
                    options: [
                        { text: 'Das ist nicht Eure Schuld.', next: 'comfort' },
                        { text: '*Schweigend zuhören*', next: 'silence' }
                    ]
                },
                'comfort': {
                    text: '*sieht dich mit roten Augen an* Nicht meine Schuld? Ich bin seine MUTTER. Ich hätte ihn beschützen müssen! *drückt das Stofftier* Das ist alles was mir von ihm bleibt...',
                    options: [
                        { text: 'Es tut mir sehr leid.', next: null }
                    ]
                },
                'silence': {
                    text: '*atmet tief* Danke... dass du zuhörst. Nicht viele tun das noch. Alle haben ihre eigenen Verluste. *flüstert* Manchmal denke ich ich sehe ihn noch. Am Fenster. Aber das ist nur mein Verstand der mir Streiche spielt.',
                    options: [
                        { text: 'Mögen die Götter Euch Frieden geben.', next: null }
                    ]
                }
            }
        },
        'arguing_merchant': {
            id: 'arguing_merchant',
            name: 'Aufgeregter Händler',
            icon: '😤',
            dialogs: {
                'default': {
                    text: '*flucht laut* Verdammte Banditen! Schon die dritte Lieferung diesen Monat! *sieht dich* Oh, Entschuldigung. Diese Zeiten machen einen wahnsinnig.',
                    options: [
                        { text: 'Was ist passiert?', next: 'bandit_problem' },
                        { text: 'Wie läuft das Geschäft?', next: 'business' }
                    ]
                },
                'bandit_problem': {
                    text: 'Banditen überall! Die Straßen sind nicht mehr sicher. Meine Karawane wurde letzte Woche überfallen. Drei gute Männer tot. *seufzt* Und die Stadtwache kann nichts tun - sie haben selbst nicht genug Soldaten.',
                    options: [
                        { text: 'Banditen oder Untote?', next: 'both_threats' },
                        { text: 'Das ist schlimm.', next: null }
                    ]
                },
                'both_threats': {
                    text: 'BEIDES! *wirft die Hände in die Luft* Im Osten die Untoten, im Westen die Banditen die das Chaos ausnutzen. Manche Ex-Soldaten sind zu Räubern geworden. *bitter* In Zeiten wie diesen zeigt sich der wahre Charakter.',
                    options: [
                        { text: 'Verstehe.', next: null }
                    ]
                },
                'business': {
                    text: '*lacht hohl* Geschäft? Welches Geschäft? Ich verkaufe für die Hälfte was ich zahle. Kein Gold kommt durch. Die Leute handeln mit Tausch. *seufzt* Bald bin ich genauso arm wie alle anderen.',
                    options: [
                        { text: 'Harte Zeiten.', next: null }
                    ]
                }
            }
        }
    },
    
    // Scene/Location Database
    scenes: {
        'awakening': {
            id: 'awakening',
            name: '???',
            description: 'Wo... bin ich?',
            background: 'bg-awakening',
            navigation: {
                interactions: [
                    { label: 'Zum Mann gehen', action: 'talk', target: 'witness', condition: () => !Player.flags.witness_gone },
                    { label: 'Kopf untersuchen', action: 'examine', target: 'severed_head' },
                    { label: 'Blutlache untersuchen', action: 'examine', target: 'blood_pool' },
                    { label: 'Dich selbst betrachten', action: 'examine', target: 'your_body' }
                ],
                exits: [
                    { label: 'Osten - Zum Dorf', direction: 'east', target: 'road_to_village', condition: () => Player.flags.road_unlocked }
                ]
            },
            objects: [
                { type: 'examine', id: 'severed_head', name: 'Abgeschlagener Kopf', x: 25, y: 55, width: 8, height: 10, examineText: 'Ein abgeschlagener Kopf liegt neben dir im Dreck. Die Augen sind noch offen... starr... leblos. Du kennst dieses Gesicht nicht. Oder doch? Du kannst dich an nichts erinnern.' },
                { type: 'examine', id: 'blood_pool', name: 'Blutlache', x: 35, y: 60, width: 12, height: 8, examineText: 'Eine große Blutlache. Ein Teil davon ist dein eigenes Blut... du hast eine vernarbte Wunde an der Brust. Aber wie kannst du noch leben?' },
                { type: 'examine', id: 'your_body', name: 'Dein Körper', x: 18, y: 50, width: 10, height: 15, examineText: 'Du betrachtest dich selbst. Zerrissene Kleidung, eine große Narbe auf der Brust wo das Schwert dich durchbohrt haben muss. Aber du atmest. Dein Herz schlägt. Wie ist das möglich?' },
                { type: 'npc', id: 'witness', name: 'Mann in der Ferne', x: 75, y: 35, width: 8, height: 18 }
            ],
            enemies: [],
            isIntro: true
        },
        'road_to_village': {
            id: 'road_to_village',
            name: 'Pfad zum Dorf',
            description: 'Ein düsterer Waldweg',
            background: 'bg-forest-path',
            navigation: {
                interactions: [
                    { label: 'Schild lesen', action: 'examine', target: 'old_sign' },
                    { label: 'Baum betrachten', action: 'examine', target: 'dead_tree' },
                    { label: 'Spinne 1 bekämpfen', action: 'fight', target: 'spider1', condition: () => !Player.flags.spider1_dead },
                    { label: 'Spinne 2 bekämpfen', action: 'fight', target: 'spider2', condition: () => !Player.flags.spider2_dead }
                ],
                exits: [
                    { label: 'Westen - Zurück', direction: 'west', target: 'awakening' },
                    { label: 'Osten - Zum Dorf', direction: 'east', target: 'village_square', condition: () => Player.flags.spider1_dead && Player.flags.spider2_dead },
                    { label: 'Süden - Zur Stadt Grauenfels', direction: 'south', target: 'road_to_city', condition: () => Player.flags.city_path_unlocked && Player.flags.spider1_dead && Player.flags.spider2_dead }
                ]
            },
            objects: [
                { type: 'examine', id: 'dead_tree', name: 'Toter Baum', x: 10, y: 20, width: 12, height: 40, examineText: 'Ein kahler, toter Baum. Seine Äste greifen wie knochige Finger in den grauen Himmel. Vor zwei Jahren war dieser Baum noch voller Leben.' },
                { type: 'examine', id: 'old_sign', name: 'Verwittertes Schild', x: 45, y: 45, width: 8, height: 12, examineText: '"Dunkelheim - 1 Meile" steht in verblasster Schrift auf dem Schild. Jemand hat mit Blut "KEHRT UM" darunter geschrieben.' },
                { type: 'enemy', id: 'spider1', name: 'Waldspinne', enemyId: 'forest_spider', x: 60, y: 50, width: 8, height: 8 },
                { type: 'enemy', id: 'spider2', name: 'Waldspinne', enemyId: 'forest_spider', x: 75, y: 35, width: 8, height: 8 }
            ],
            enemies: []
        },
        'village_square': {
            id: 'village_square',
            name: 'Dorfplatz - Dunkelheim',
            description: 'Das vergessene Dorf',
            background: 'bg-village',
            navigation: {
                interactions: [
                    { label: 'Lina ansprechen', action: 'talk', target: 'innkeeper_daughter', condition: () => !Player.flags.met_innkeeper },
                    { label: 'Schmied ansprechen', action: 'talk', target: 'blacksmith', condition: () => Player.flags.met_innkeeper },
                    { label: 'Bauer ansprechen', action: 'talk', target: 'farmer', condition: () => Player.flags.met_innkeeper },
                    { label: 'Jäger ansprechen', action: 'talk', target: 'hunter', condition: () => Player.flags.met_innkeeper },
                    { label: 'Besorgte Frau ansprechen', action: 'talk', target: 'worried_woman', condition: () => Player.flags.looted_husband && !Player.flags.husband_quest_done },
                    { label: 'Kräuterfrau ansprechen', action: 'talk', target: 'herbalist', condition: () => Player.flags.met_innkeeper },
                    { label: 'Alter Fischer ansprechen', action: 'talk', target: 'old_fisherman', condition: () => Player.flags.met_innkeeper }
                ],
                exits: [
                    { label: 'Westen - Zum Sumpf', direction: 'west', target: 'swamp_entrance', condition: () => Player.flags.met_innkeeper },
                    { label: 'Osten - Zur Mine', direction: 'east', target: 'mine_path', condition: () => Player.flags.mine_quest_started },
                    { label: 'Norden - In den Wald', direction: 'north', target: 'forest_entrance', condition: () => Player.flags.met_innkeeper },
                    { label: 'Süden - Waldpfad (Zurück)', direction: 'south', target: 'road_to_village' },
                    { label: 'Taverne betreten', direction: 'enter', target: 'tavern', condition: () => Player.flags.met_innkeeper }
                ]
            },
            objects: [
                { type: 'npc', id: 'innkeeper_daughter', name: 'Lina', x: 45, y: 50, width: 6, height: 12 },
                { type: 'npc', id: 'blacksmith', name: 'Schmied', x: 10, y: 55, width: 6, height: 12 },
                { type: 'npc', id: 'farmer', name: 'Bauer', x: 85, y: 55, width: 6, height: 12 },
                { type: 'npc', id: 'hunter', name: 'Jäger', x: 25, y: 60, width: 6, height: 12 },
                { type: 'npc', id: 'worried_woman', name: 'Besorgte Frau', x: 65, y: 58, width: 5, height: 10, condition: () => Player.flags.looted_husband && !Player.flags.husband_quest_done },
                { type: 'npc', id: 'herbalist', name: 'Kräuterfrau', x: 75, y: 45, width: 5, height: 10 },
                { type: 'npc', id: 'old_fisherman', name: 'Fischer', x: 35, y: 65, width: 6, height: 10 }
            ],
            enemies: []
        },
        'tavern': {
            id: 'tavern',
            name: 'Taverne "Zum Rostigen Nagel"',
            description: 'Wärme und der Geruch von Essen',
            background: 'bg-house-interior',
            navigation: {
                interactions: [
                    { label: 'Wirt ansprechen', action: 'talk', target: 'innkeeper' },
                    { label: 'In den Keller gehen', action: 'goto', target: 'tavern_cellar', condition: () => Player.flags.cellar_quest_started && !Player.flags.cellar_cleared }
                ],
                exits: [
                    { label: 'Hinausgehen', direction: 'exit', target: 'village_square' }
                ]
            },
            objects: [
                { type: 'npc', id: 'innkeeper', name: 'Bertram der Wirt', x: 50, y: 40, width: 8, height: 14 }
            ],
            enemies: []
        },
        'tavern_cellar': {
            id: 'tavern_cellar',
            name: 'Taverne - Keller',
            description: 'Ein dunkler, feuchter Keller',
            background: 'bg-cave',
            navigation: {
                interactions: [
                    { label: 'Riesenratte bekämpfen', action: 'fight', target: 'cellar_rat1', condition: () => !Player.flags.cellar_rat1_dead },
                    { label: 'Riesenratte bekämpfen', action: 'fight', target: 'cellar_rat2', condition: () => !Player.flags.cellar_rat2_dead },
                    { label: 'Riesenratte bekämpfen', action: 'fight', target: 'cellar_rat3', condition: () => !Player.flags.cellar_rat3_dead },
                    { label: 'RATTENKÖNIGIN bekämpfen!', action: 'fight', target: 'rat_queen', condition: () => Player.flags.cellar_rat1_dead && Player.flags.cellar_rat2_dead && Player.flags.cellar_rat3_dead && !Player.flags.rat_queen_dead }
                ],
                exits: [
                    { label: 'Nach oben', direction: 'up', target: 'tavern' }
                ]
            },
            objects: [
                { type: 'enemy', id: 'cellar_rat1', name: 'Riesenratte', enemyId: 'rat', x: 20, y: 45, width: 8, height: 8 },
                { type: 'enemy', id: 'cellar_rat2', name: 'Riesenratte', enemyId: 'rat', x: 50, y: 55, width: 8, height: 8 },
                { type: 'enemy', id: 'cellar_rat3', name: 'Riesenratte', enemyId: 'rat', x: 75, y: 40, width: 8, height: 8 },
                { type: 'enemy', id: 'rat_queen', name: 'Rattenkönigin', enemyId: 'rat_queen', x: 45, y: 30, width: 12, height: 12 }
            ],
            enemies: []
        },
        'mine_path': {
            id: 'mine_path',
            name: 'Pfad zur Mine',
            description: 'Ein steiniger Weg nach Osten',
            background: 'bg-forest-path',
            navigation: {
                interactions: [
                    { label: 'Minispinne 1 bekämpfen', action: 'fight', target: 'minispider1', condition: () => !Player.flags.minispider1_dead },
                    { label: 'Minispinne 2 bekämpfen', action: 'fight', target: 'minispider2', condition: () => !Player.flags.minispider2_dead }
                ],
                exits: [
                    { label: 'Westen - Zurück zum Dorf', direction: 'west', target: 'village_square' },
                    { label: 'Osten - Mine betreten', direction: 'east', target: 'mine_entrance', condition: () => Player.flags.minispider1_dead && Player.flags.minispider2_dead }
                ]
            },
            objects: [
                { type: 'enemy', id: 'minispider1', name: 'Minispinne', enemyId: 'mini_spider', x: 40, y: 50, width: 6, height: 6 },
                { type: 'enemy', id: 'minispider2', name: 'Minispinne', enemyId: 'mini_spider', x: 65, y: 40, width: 6, height: 6 }
            ],
            enemies: []
        },
        'mine_entrance': {
            id: 'mine_entrance',
            name: 'Mine - Eingang',
            description: 'Der erste Raum der dunklen Mine',
            background: 'bg-cave',
            navigation: {
                interactions: [
                    { label: 'Höhlenspinne 1 bekämpfen', action: 'fight', target: 'cavespider1', condition: () => !Player.flags.cavespider1_dead },
                    { label: 'Höhlenspinne 2 bekämpfen', action: 'fight', target: 'cavespider2', condition: () => !Player.flags.cavespider2_dead },
                    { label: 'Eisenerz abbauen', action: 'mine', target: 'ore1', condition: () => Player.flags.cavespider1_dead && Player.flags.cavespider2_dead && !Player.flags.ore1_mined }
                ],
                exits: [
                    { label: 'Westen - Raus aus der Mine', direction: 'west', target: 'mine_path' },
                    { label: 'Tiefer vordringen', direction: 'east', target: 'mine_middle', condition: () => Player.flags.cavespider1_dead && Player.flags.cavespider2_dead }
                ]
            },
            objects: [
                { type: 'enemy', id: 'cavespider1', name: 'Höhlenspinne', enemyId: 'cave_spider', x: 35, y: 45, width: 8, height: 8 },
                { type: 'enemy', id: 'cavespider2', name: 'Höhlenspinne', enemyId: 'cave_spider', x: 60, y: 50, width: 8, height: 8 }
            ],
            enemies: []
        },
        'mine_middle': {
            id: 'mine_middle',
            name: 'Mine - Tiefe Tunnel',
            description: 'Es wird immer dunkler',
            background: 'bg-cave',
            navigation: {
                interactions: [
                    { label: 'Höhlenspinne bekämpfen', action: 'fight', target: 'cavespider3', condition: () => !Player.flags.cavespider3_dead },
                    { label: 'Höhlenspinne bekämpfen', action: 'fight', target: 'cavespider4', condition: () => !Player.flags.cavespider4_dead },
                    { label: 'Höhlenspinne bekämpfen', action: 'fight', target: 'cavespider5', condition: () => !Player.flags.cavespider5_dead },
                    { label: 'Manatrank aufheben', action: 'pickup', target: 'mine_mana_potion', condition: () => !SceneManager.pickedItems.has('mine_mana_potion') },
                    { label: 'Eisenerz abbauen', action: 'mine', target: 'ore2', condition: () => Player.flags.cavespider3_dead && Player.flags.cavespider4_dead && Player.flags.cavespider5_dead && !Player.flags.ore2_mined }
                ],
                exits: [
                    { label: 'Zurück zum Eingang', direction: 'west', target: 'mine_entrance' },
                    { label: 'Noch tiefer vordringen', direction: 'east', target: 'mine_depths', condition: () => Player.flags.cavespider3_dead && Player.flags.cavespider4_dead && Player.flags.cavespider5_dead }
                ]
            },
            objects: [
                { type: 'enemy', id: 'cavespider3', name: 'Höhlenspinne', enemyId: 'cave_spider', x: 25, y: 40, width: 8, height: 8 },
                { type: 'enemy', id: 'cavespider4', name: 'Höhlenspinne', enemyId: 'cave_spider', x: 50, y: 55, width: 8, height: 8 },
                { type: 'enemy', id: 'cavespider5', name: 'Höhlenspinne', enemyId: 'cave_spider', x: 70, y: 35, width: 8, height: 8 },
                { type: 'item', id: 'mine_mana_potion', itemId: 'mana_potion', x: 85, y: 50, width: 5, height: 7 }
            ],
            enemies: []
        },
        'mine_depths': {
            id: 'mine_depths',
            name: 'Mine - Tiefste Kammer',
            description: 'Das Nest der Spinnenkönigin',
            background: 'bg-cave',
            navigation: {
                interactions: [
                    { label: 'RIESENSPINNE bekämpfen!', action: 'fight', target: 'giantspider_boss', condition: () => !Player.flags.giantspider_boss_dead },
                    { label: 'Eisenerz abbauen (Reiches Vorkommen)', action: 'mine', target: 'ore3', condition: () => Player.flags.giantspider_boss_dead && !Player.flags.ore3_mined }
                ],
                exits: [
                    { label: 'Zurück', direction: 'west', target: 'mine_middle' },
                    { label: '>>> Direkt zurück zum Dorf <<<', direction: 'exit', target: 'village_square', condition: () => Player.flags.giantspider_boss_dead && Player.flags.ore3_mined }
                ]
            },
            objects: [
                { type: 'enemy', id: 'giantspider_boss', name: 'RIESENSPINNE', enemyId: 'giant_spider', x: 45, y: 35, width: 15, height: 15 }
            ],
            enemies: []
        },
        'forest_entrance': {
            id: 'forest_entrance',
            name: 'Nördlicher Wald - Eingang',
            description: 'Ein düsterer Wald',
            background: 'bg-forest-path',
            navigation: {
                interactions: [
                    { label: 'Wolf bekämpfen', action: 'fight', target: 'wolf1', condition: () => !Player.flags.wolf1_dead },
                    { label: 'Wolf bekämpfen', action: 'fight', target: 'wolf2', condition: () => !Player.flags.wolf2_dead }
                ],
                exits: [
                    { label: 'Süden - Zurück zum Dorf', direction: 'south', target: 'village_square' },
                    { label: 'Norden - Tiefer in den Wald', direction: 'north', target: 'forest_hut', condition: () => Player.flags.wolf1_dead && Player.flags.wolf2_dead }
                ]
            },
            objects: [
                { type: 'enemy', id: 'wolf1', name: 'Wolf', enemyId: 'wolf', x: 30, y: 45, width: 10, height: 10 },
                { type: 'enemy', id: 'wolf2', name: 'Wolf', enemyId: 'wolf', x: 60, y: 50, width: 10, height: 10 }
            ],
            enemies: []
        },
        'forest_hut': {
            id: 'forest_hut',
            name: 'Alte Jägerhütte',
            description: 'Eine verlassene Hütte im Wald',
            background: 'bg-forest-path',
            navigation: {
                interactions: [
                    { label: 'Truhe öffnen', action: 'container', target: 'hut_chest', condition: () => !SceneManager.openedContainers.has('hut_chest') }
                ],
                exits: [
                    { label: 'Süden - Zurück', direction: 'south', target: 'forest_entrance' },
                    { label: 'Norden - Weiter in den Wald', direction: 'north', target: 'forest_clearing' }
                ]
            },
            objects: [
                { type: 'container', id: 'hut_chest', name: 'Alte Truhe', x: 50, y: 40, width: 10, height: 8, contents: ['beer', 'beer', 'bread'] }
            ],
            enemies: []
        },
        'forest_clearing': {
            id: 'forest_clearing',
            name: 'Waldlichtung',
            description: 'Eine düstere Lichtung mit einer Leiche',
            background: 'bg-forest-path',
            navigation: {
                interactions: [
                    { label: 'Leiche durchsuchen', action: 'loot_body', target: 'dead_husband', condition: () => !Player.flags.looted_husband && !Player.flags.bandit_dead }
                ],
                exits: [
                    { label: 'Süden - Zurück zur Hütte', direction: 'south', target: 'forest_hut', condition: () => !Player.flags.looted_husband || !Player.flags.bandit_dead },
                    { label: '>>> Direkt zurück zum Dorf <<<', direction: 'exit', target: 'village_square', condition: () => Player.flags.looted_husband && Player.flags.bandit_dead }
                ]
            },
            objects: [
                { type: 'examine', id: 'dead_body', name: 'Leiche', x: 45, y: 50, width: 12, height: 10, examineText: 'Ein Mann liegt hier... tot. Frische Wunden. Er wurde erst vor kurzem getötet. Das muss der vermisste Ehemann sein.' }
            ],
            enemies: []
        },
        'swamp_entrance': {
            id: 'swamp_entrance',
            name: 'Sumpfgebiet - Eingang',
            description: 'Ein feuchter, modriger Sumpf',
            background: 'bg-swamp',
            navigation: {
                interactions: [
                    { label: 'Wolf bekämpfen', action: 'fight', target: 'swamp_wolf1', condition: () => !Player.flags.swamp_wolf1_dead },
                    { label: 'Wolf bekämpfen', action: 'fight', target: 'swamp_wolf2', condition: () => !Player.flags.swamp_wolf2_dead },
                    { label: 'Wolf bekämpfen', action: 'fight', target: 'swamp_wolf3', condition: () => !Player.flags.swamp_wolf3_dead },
                    { label: 'Tote Kuh untersuchen', action: 'examine', target: 'dead_cow', condition: () => Player.flags.swamp_wolf1_dead && Player.flags.swamp_wolf2_dead && Player.flags.swamp_wolf3_dead && !Player.flags.saw_dead_cow }
                ],
                exits: [
                    { label: 'Osten - Zurück zum Dorf', direction: 'east', target: 'village_square' },
                    { label: 'Westen - Tiefer in den Sumpf', direction: 'west', target: 'swamp_middle', condition: () => Player.flags.swamp_wolf1_dead && Player.flags.swamp_wolf2_dead && Player.flags.swamp_wolf3_dead }
                ]
            },
            objects: [
                { type: 'enemy', id: 'swamp_wolf1', name: 'Wolf', enemyId: 'wolf', x: 25, y: 45, width: 10, height: 10 },
                { type: 'enemy', id: 'swamp_wolf2', name: 'Wolf', enemyId: 'wolf', x: 50, y: 35, width: 10, height: 10 },
                { type: 'enemy', id: 'swamp_wolf3', name: 'Wolf', enemyId: 'wolf', x: 70, y: 50, width: 10, height: 10 },
                { type: 'examine', id: 'dead_cow', name: 'Tote Kuh', x: 45, y: 60, width: 15, height: 12, examineText: '*Du findest die Überreste einer Kuh. Wölfe haben sie gefressen - überall liegen Knochen und Fellreste. Das muss die vermisste Kuh des Bauern sein. Du solltest ihm davon berichten.*' }
            ],
            enemies: []
        },
        'swamp_middle': {
            id: 'swamp_middle',
            name: 'Sumpfgebiet - Mitte',
            description: 'Modrige Luft und gefährliche Kreaturen',
            background: 'bg-swamp',
            navigation: {
                interactions: [
                    { label: 'Riesenfrosch bekämpfen', action: 'fight', target: 'frog2', condition: () => !Player.flags.frog2_dead },
                    { label: 'Riesenfrosch bekämpfen', action: 'fight', target: 'frog3', condition: () => !Player.flags.frog3_dead },
                    { label: 'Sumpfeidechse bekämpfen', action: 'fight', target: 'swampspider2', condition: () => !Player.flags.swampspider2_dead },
                    { label: 'Mondblumen pflücken', action: 'pick_herb', target: 'moonflower1', condition: () => Player.flags.frog2_dead && Player.flags.frog3_dead && !Player.flags.moonflower1_picked }
                ],
                exits: [
                    { label: 'Osten - Zurück', direction: 'east', target: 'swamp_entrance' },
                    { label: 'Westen - Zum See', direction: 'west', target: 'lake', condition: () => Player.flags.frog2_dead && Player.flags.frog3_dead && Player.flags.swampspider2_dead }
                ]
            },
            objects: [
                { type: 'enemy', id: 'frog2', name: 'Riesenfrosch', enemyId: 'giant_frog', x: 25, y: 50, width: 10, height: 10 },
                { type: 'enemy', id: 'frog3', name: 'Riesenfrosch', enemyId: 'giant_frog', x: 55, y: 35, width: 10, height: 10 },
                { type: 'enemy', id: 'swampspider2', name: 'Sumpfeidechse', enemyId: 'swamp_lizard', x: 75, y: 55, width: 8, height: 8 }
            ],
            enemies: []
        },
        'lake': {
            id: 'lake',
            name: 'Der Stille See',
            description: 'Ein dunkler See, unheimlich still',
            background: 'bg-swamp',
            navigation: {
                interactions: [
                    { label: 'Sumpfeidechse bekämpfen', action: 'fight', target: 'swampspider3', condition: () => !Player.flags.swampspider3_dead },
                    { label: 'Mondblumen pflücken', action: 'pick_herb', target: 'moonflower2', condition: () => Player.flags.swampspider3_dead && !Player.flags.moonflower2_picked },
                    { label: 'Angelrute aufheben', action: 'pickup', target: 'fishing_rod_item', condition: () => Player.flags.swampspider3_dead && !SceneManager.pickedItems.has('fishing_rod_item') }
                ],
                exits: [
                    { label: 'Osten - Zurück in den Sumpf', direction: 'east', target: 'swamp_middle' },
                    { label: 'Norden - In die Höhle', direction: 'north', target: 'lake_cave', condition: () => Player.flags.swampspider3_dead }
                ]
            },
            objects: [
                { type: 'enemy', id: 'swampspider3', name: 'Sumpfeidechse', enemyId: 'swamp_lizard', x: 40, y: 40, width: 10, height: 10 },
                { type: 'item', id: 'fishing_rod_item', itemId: 'old_fishing_rod', x: 70, y: 55, width: 8, height: 12 }
            ],
            enemies: []
        },
        'lake_cave': {
            id: 'lake_cave',
            name: 'Höhle am See',
            description: 'Eine dunkle Höhle hinter dem See',
            background: 'bg-cave',
            navigation: {
                interactions: [
                    { label: 'Riesenfrosch bekämpfen', action: 'fight', target: 'cave_frog1', condition: () => !Player.flags.cave_frog1_dead },
                    { label: 'Riesenfrosch bekämpfen', action: 'fight', target: 'cave_frog2', condition: () => !Player.flags.cave_frog2_dead },
                    { label: 'Sumpfeidechse bekämpfen', action: 'fight', target: 'cave_lizard1', condition: () => !Player.flags.cave_lizard1_dead },
                    { label: 'Sumpfeidechse bekämpfen', action: 'fight', target: 'cave_lizard2', condition: () => !Player.flags.cave_lizard2_dead },
                    { label: 'Truhe öffnen', action: 'container', target: 'lake_cave_chest', condition: () => Player.flags.cave_frog1_dead && Player.flags.cave_frog2_dead && Player.flags.cave_lizard1_dead && Player.flags.cave_lizard2_dead && !SceneManager.openedContainers.has('lake_cave_chest') }
                ],
                exits: [
                    { label: 'Süden - Zurück zum See', direction: 'south', target: 'lake' },
                    { label: '>>> Direkt zurück zum Dorf <<<', direction: 'exit', target: 'village_square', condition: () => SceneManager.openedContainers.has('lake_cave_chest') }
                ]
            },
            objects: [
                { type: 'enemy', id: 'cave_frog1', name: 'Riesenfrosch', enemyId: 'giant_frog', x: 20, y: 40, width: 10, height: 10 },
                { type: 'enemy', id: 'cave_frog2', name: 'Riesenfrosch', enemyId: 'giant_frog', x: 60, y: 35, width: 10, height: 10 },
                { type: 'enemy', id: 'cave_lizard1', name: 'Sumpfeidechse', enemyId: 'swamp_lizard', x: 35, y: 55, width: 8, height: 8 },
                { type: 'enemy', id: 'cave_lizard2', name: 'Sumpfeidechse', enemyId: 'swamp_lizard', x: 75, y: 50, width: 8, height: 8 },
                { type: 'container', id: 'lake_cave_chest', name: 'Alte Truhe', x: 45, y: 25, width: 12, height: 10, contents: [
                    { itemId: 'strength_ring', quantity: 1 },
                    { itemId: 'bread', quantity: 2 }
                ]}
            ],
            enemies: []
        },
        
        // ===== ROAD TO CITY =====
        'road_to_city': {
            id: 'road_to_city',
            name: 'Straße nach Grauenfels',
            description: 'Eine verlassene Handelsstraße',
            background: 'bg-forest-path',
            navigation: {
                interactions: [
                    { label: 'Bandit bekämpfen', action: 'fight', target: 'road_bandit1', condition: () => !Player.flags.road_bandit1_dead },
                    { label: 'Bandit bekämpfen', action: 'fight', target: 'road_bandit2', condition: () => !Player.flags.road_bandit2_dead },
                    { label: 'Leiche durchsuchen', action: 'loot_road_body', target: 'dead_merchant', condition: () => Player.flags.road_bandit1_dead && Player.flags.road_bandit2_dead && !Player.flags.looted_merchant }
                ],
                exits: [
                    { label: 'Norden - Zurück zum Waldpfad', direction: 'north', target: 'forest_path' },
                    { label: 'Süden - Weiter zur Stadt', direction: 'south', target: 'road_merchant', condition: () => Player.flags.road_bandit1_dead && Player.flags.road_bandit2_dead }
                ]
            },
            objects: [
                { type: 'enemy', id: 'road_bandit1', name: 'Straßenräuber', enemyId: 'bandit', x: 30, y: 45, width: 10, height: 12 },
                { type: 'enemy', id: 'road_bandit2', name: 'Straßenräuber', enemyId: 'bandit', x: 60, y: 40, width: 10, height: 12 },
                { type: 'examine', id: 'dead_merchant', name: 'Tote Gestalt', x: 45, y: 60, width: 10, height: 8, examineText: 'Ein toter Händler. Die Banditen haben ihn ausgeplündert.' }
            ],
            enemies: []
        },
        'road_merchant': {
            id: 'road_merchant',
            name: 'Rastplatz an der Straße',
            description: 'Ein fahrender Händler hat hier Lager aufgeschlagen',
            background: 'bg-forest-path',
            navigation: {
                interactions: [
                    { label: 'Händler ansprechen', action: 'talk', target: 'traveling_merchant' }
                ],
                exits: [
                    { label: 'Norden - Zurück', direction: 'north', target: 'road_to_city' },
                    { label: 'Süden - Zur Stadt', direction: 'south', target: 'city_gate' }
                ]
            },
            objects: [
                { type: 'npc', id: 'traveling_merchant', name: 'Fahrender Händler Viktor', x: 50, y: 45, width: 10, height: 14 }
            ],
            enemies: []
        },
        
        // ===== CITY OF GRAUENFELS =====
        'city_gate': {
            id: 'city_gate',
            name: 'Stadttor von Grauenfels',
            description: 'Die einst stolze Stadt liegt in Trümmern',
            background: 'bg-village',
            navigation: {
                interactions: [
                    { label: 'Wache ansprechen', action: 'talk', target: 'city_guard' }
                ],
                exits: [
                    { label: 'Norden - Zurück zur Straße', direction: 'north', target: 'road_merchant' },
                    { label: 'In die Stadt', direction: 'enter', target: 'city_square' }
                ]
            },
            objects: [
                { type: 'npc', id: 'city_guard', name: 'Müde Wache', x: 30, y: 45, width: 8, height: 14 }
            ],
            enemies: []
        },
        'city_square': {
            id: 'city_square',
            name: 'Marktplatz von Grauenfels',
            description: 'Das Herz der Stadt - einst voller Leben',
            background: 'bg-village',
            navigation: {
                interactions: [
                    { label: 'Alte Frau ansprechen', action: 'talk', target: 'old_seer' },
                    { label: 'Händlerin ansprechen', action: 'talk', target: 'city_merchant' },
                    { label: 'Ausrufer anhören', action: 'talk', target: 'town_crier' },
                    { label: 'Kranken Mann ansprechen', action: 'talk', target: 'sick_healer' },
                    { label: 'Kräutersammlerin ansprechen', action: 'talk', target: 'herb_collector', condition: () => Player.flags.healer_quest_started },
                    { label: 'Bettler ansprechen', action: 'talk', target: 'hungry_beggar' },
                    { label: 'Verstörten Wächter ansprechen', action: 'talk', target: 'traumatized_guard' }
                ],
                exits: [
                    { label: 'Süden - Zum Stadttor', direction: 'south', target: 'city_gate' },
                    { label: 'Osten - Zur Taverne', direction: 'east', target: 'city_tavern' },
                    { label: 'Westen - Zu den Ruinen', direction: 'west', target: 'city_ruins', condition: () => Player.flags.ruins_known },
                    { label: 'Norden - Zur Kathedrale', direction: 'north', target: 'city_cathedral', condition: () => Player.flags.cathedral_known },
                    { label: 'Nordosten - Nach Steinwacht', direction: 'northeast', target: 'road_to_steinwacht', condition: () => Player.flags.grimm_dead }
                ]
            },
            objects: [
                { type: 'npc', id: 'old_seer', name: 'Alte Seherin Magda', x: 20, y: 50, width: 8, height: 12 },
                { type: 'npc', id: 'city_merchant', name: 'Händlerin Elara', x: 45, y: 35, width: 8, height: 14 },
                { type: 'npc', id: 'town_crier', name: 'Ausrufer', x: 70, y: 55, width: 8, height: 14 },
                { type: 'npc', id: 'sick_healer', name: 'Kranker Heiler Marcus', x: 30, y: 70, width: 8, height: 12 },
                { type: 'npc', id: 'hungry_beggar', name: 'Ausgehungerter Bettler', x: 85, y: 65, width: 6, height: 10 },
                { type: 'npc', id: 'traumatized_guard', name: 'Verstörter Wächter', x: 10, y: 35, width: 8, height: 14 }
            ],
            enemies: []
        },
        'city_tavern': {
            id: 'city_tavern',
            name: 'Taverne "Zur Letzten Hoffnung"',
            description: 'Eine düstere Spelunke',
            background: 'bg-house-interior',
            navigation: {
                interactions: [
                    { label: 'Wirt ansprechen', action: 'talk', target: 'city_innkeeper' },
                    { label: 'Kopfgeldjäger ansprechen', action: 'talk', target: 'bounty_hunter' },
                    { label: 'Mysteriöser Mann ansprechen', action: 'talk', target: 'mysterious_man', condition: () => Player.flags.met_seer }
                ],
                exits: [
                    { label: 'Hinaus zum Marktplatz', direction: 'west', target: 'city_square' },
                    { label: 'In die Gasse (Grimm)', direction: 'alley', target: 'city_alley', condition: () => Player.flags.alley_unlocked && !Player.flags.grimm_dead }
                ]
            },
            objects: [
                { type: 'npc', id: 'city_innkeeper', name: 'Wirt Gregor', x: 50, y: 35, width: 8, height: 14 },
                { type: 'npc', id: 'bounty_hunter', name: 'Kopfgeldjäger Raven', x: 25, y: 50, width: 10, height: 14 },
                { type: 'npc', id: 'mysterious_man', name: 'Vermummter Mann', x: 75, y: 55, width: 8, height: 14, condition: () => Player.flags.met_seer }
            ],
            enemies: []
        },
        'city_ruins': {
            id: 'city_ruins',
            name: 'Ruinen des alten Viertels',
            description: 'Zerstörte Gebäude und Gefahren',
            background: 'bg-cave',
            navigation: {
                interactions: [
                    { label: 'Geist bekämpfen', action: 'fight', target: 'ruins_ghost1', condition: () => !Player.flags.ruins_ghost1_dead },
                    { label: 'Geist bekämpfen', action: 'fight', target: 'ruins_ghost2', condition: () => !Player.flags.ruins_ghost2_dead },
                    { label: 'Skelett bekämpfen', action: 'fight', target: 'ruins_skeleton1', condition: () => !Player.flags.ruins_skeleton1_dead },
                    { label: 'Skelett bekämpfen', action: 'fight', target: 'ruins_skeleton2', condition: () => !Player.flags.ruins_skeleton2_dead },
                    { label: 'Truhe öffnen', action: 'container', target: 'ruins_chest', condition: () => Player.flags.ruins_ghost1_dead && Player.flags.ruins_ghost2_dead && !SceneManager.openedContainers.has('ruins_chest') },
                    { label: 'Alte Dokumente untersuchen', action: 'examine', target: 'old_documents', condition: () => Player.flags.ruins_ghost1_dead && Player.flags.ruins_ghost2_dead && !Player.flags.found_documents }
                ],
                exits: [
                    { label: 'Osten - Zurück zum Marktplatz', direction: 'east', target: 'city_square' },
                    { label: '>>> Direkt zum Marktplatz <<<', direction: 'exit', target: 'city_square', condition: () => Player.flags.found_documents }
                ]
            },
            objects: [
                { type: 'enemy', id: 'ruins_ghost1', name: 'Ruheloser Geist', enemyId: 'ghost', x: 20, y: 40, width: 10, height: 12 },
                { type: 'enemy', id: 'ruins_ghost2', name: 'Ruheloser Geist', enemyId: 'ghost', x: 65, y: 35, width: 10, height: 12 },
                { type: 'enemy', id: 'ruins_skeleton1', name: 'Skelettkrieger', enemyId: 'skeleton', x: 35, y: 55, width: 8, height: 12 },
                { type: 'enemy', id: 'ruins_skeleton2', name: 'Skelettkrieger', enemyId: 'skeleton', x: 75, y: 50, width: 8, height: 12 },
                { type: 'container', id: 'ruins_chest', name: 'Verschüttete Truhe', x: 45, y: 25, width: 12, height: 10, contents: [
                    { itemId: 'chainmail', quantity: 1 },
                    { itemId: 'health_potion', quantity: 3 }
                ]},
                { type: 'examine', id: 'old_documents', name: 'Alte Dokumente', x: 55, y: 60, width: 8, height: 6, examineText: '*Du findest verbrannte Pergamente* "...der Schattenfürst kam mit einer Armee aus Leichen... der König fiel in der ersten Nacht... seine Diener, die Familie..." *der Rest ist unleserlich, aber du siehst ein Siegel - es kommt dir seltsam vertraut vor...*' }
            ],
            enemies: []
        },
        'city_cathedral': {
            id: 'city_cathedral',
            name: 'Ruine der Kathedrale',
            description: 'Das einst heilige Gebäude liegt in Trümmern',
            background: 'bg-cave',
            navigation: {
                interactions: [
                    { label: 'Zombie bekämpfen', action: 'fight', target: 'cathedral_zombie1', condition: () => !Player.flags.cathedral_zombie1_dead },
                    { label: 'Zombie bekämpfen', action: 'fight', target: 'cathedral_zombie2', condition: () => !Player.flags.cathedral_zombie2_dead },
                    { label: 'Zombie bekämpfen', action: 'fight', target: 'cathedral_zombie3', condition: () => !Player.flags.cathedral_zombie3_dead },
                    { label: 'Altar untersuchen', action: 'examine', target: 'cathedral_altar', condition: () => Player.flags.cathedral_zombie1_dead && Player.flags.cathedral_zombie2_dead && Player.flags.cathedral_zombie3_dead && !Player.flags.examined_altar },
                    { label: 'Heiliges Symbol nehmen', action: 'pickup', target: 'holy_symbol_item', condition: () => Player.flags.examined_altar && !SceneManager.pickedItems.has('holy_symbol_item') }
                ],
                exits: [
                    { label: 'Süden - Zurück zum Marktplatz', direction: 'south', target: 'city_square' }
                ]
            },
            objects: [
                { type: 'enemy', id: 'cathedral_zombie1', name: 'Entweihter Priester', enemyId: 'zombie', x: 25, y: 45, width: 10, height: 12 },
                { type: 'enemy', id: 'cathedral_zombie2', name: 'Entweihter Priester', enemyId: 'zombie', x: 55, y: 40, width: 10, height: 12 },
                { type: 'enemy', id: 'cathedral_zombie3', name: 'Entweihter Priester', enemyId: 'zombie', x: 75, y: 55, width: 10, height: 12 },
                { type: 'examine', id: 'cathedral_altar', name: 'Zerstörter Altar', x: 45, y: 25, width: 15, height: 10, examineText: '*Der Altar ist mit dunklem Blut beschmiert* Hier fand ein Massaker statt. Unter den Trümmern siehst du ein goldenes Symbol glänzen...' },
                { type: 'item', id: 'holy_symbol_item', itemId: 'holy_symbol', x: 48, y: 30, width: 6, height: 6 }
            ],
            enemies: []
        },
        'sewer_entrance': {
            id: 'sewer_entrance',
            name: 'Kanalisation - Eingang',
            description: 'Dunkle, stinkende Tunnel unter der Stadt',
            background: 'bg-cave',
            navigation: {
                interactions: [
                    { label: 'Riesenratte bekämpfen', action: 'fight', target: 'sewer_rat1', condition: () => !Player.flags.sewer_rat1_dead },
                    { label: 'Riesenratte bekämpfen', action: 'fight', target: 'sewer_rat2', condition: () => !Player.flags.sewer_rat2_dead },
                    { label: 'Riesenratte bekämpfen', action: 'fight', target: 'sewer_rat3', condition: () => !Player.flags.sewer_rat3_dead }
                ],
                exits: [
                    { label: 'Nach oben - Zur Taverne', direction: 'up', target: 'city_tavern' },
                    { label: 'Tiefer in die Kanalisation', direction: 'north', target: 'sewer_depths', condition: () => Player.flags.sewer_rat1_dead && Player.flags.sewer_rat2_dead && Player.flags.sewer_rat3_dead }
                ]
            },
            objects: [
                { type: 'enemy', id: 'sewer_rat1', name: 'Kanalratte', enemyId: 'rat', x: 25, y: 45, width: 8, height: 8 },
                { type: 'enemy', id: 'sewer_rat2', name: 'Kanalratte', enemyId: 'rat', x: 50, y: 50, width: 8, height: 8 },
                { type: 'enemy', id: 'sewer_rat3', name: 'Kanalratte', enemyId: 'rat', x: 70, y: 40, width: 8, height: 8 }
            ],
            enemies: []
        },
        'sewer_depths': {
            id: 'sewer_depths',
            name: 'Kanalisation - Tiefe',
            description: 'Das Versteck des Diebes',
            background: 'bg-cave',
            navigation: {
                interactions: [
                    { label: 'Skeleton bekämpfen', action: 'fight', target: 'sewer_skeleton', condition: () => !Player.flags.sewer_skeleton_dead },
                    { label: 'Kiste öffnen', action: 'container', target: 'stolen_goods', condition: () => Player.flags.sewer_skeleton_dead && !SceneManager.openedContainers.has('stolen_goods') }
                ],
                exits: [
                    { label: 'Zurück zum Eingang', direction: 'south', target: 'sewer_entrance' },
                    { label: '>>> Zur Taverne <<<', direction: 'exit', target: 'city_tavern', condition: () => SceneManager.openedContainers.has('stolen_goods') }
                ]
            },
            objects: [
                { type: 'enemy', id: 'sewer_skeleton', name: 'Skelett des Diebes', enemyId: 'skeleton', x: 45, y: 40, width: 10, height: 14 },
                { type: 'container', id: 'stolen_goods', name: 'Gestohlene Waren', x: 50, y: 25, width: 14, height: 10, contents: [
                    { itemId: 'merchant_goods', quantity: 1 },
                    { itemId: 'gold_ring', quantity: 1 },
                    { itemId: 'health_potion', quantity: 2 }
                ]}
            ],
            enemies: []
        },
        
        // ===== ALLEY - GRIMM ENCOUNTER =====
        'city_alley': {
            id: 'city_alley',
            name: 'Dunkle Gasse',
            description: 'Eine gefährliche Gasse hinter der Taverne',
            background: 'bg-cave',
            navigation: {
                interactions: [
                    { label: 'Grimm konfrontieren', action: 'talk', target: 'grimm', condition: () => !Player.flags.grimm_dead },
                    { label: 'Grimms Leiche durchsuchen', action: 'loot_grimm', target: 'grimm_body', condition: () => Player.flags.grimm_dead && !Player.flags.looted_grimm }
                ],
                exits: [
                    { label: 'Zurück zur Taverne', direction: 'east', target: 'city_tavern' }
                ]
            },
            objects: [
                { type: 'npc', id: 'grimm', name: 'Grimm der Schlächter', x: 45, y: 40, width: 12, height: 16, condition: () => !Player.flags.grimm_dead }
            ],
            enemies: []
        },
        
        // ===== ROAD TO STEINWACHT =====
        'road_to_steinwacht': {
            id: 'road_to_steinwacht',
            name: 'Östliche Handelsstraße',
            description: 'Der Weg nach Steinwacht',
            background: 'bg-forest-path',
            navigation: {
                interactions: [
                    { label: 'Skelett bekämpfen', action: 'fight', target: 'road_skeleton1', condition: () => !Player.flags.road_skeleton1_dead },
                    { label: 'Skelett bekämpfen', action: 'fight', target: 'road_skeleton2', condition: () => !Player.flags.road_skeleton2_dead },
                    { label: 'Zombie bekämpfen', action: 'fight', target: 'road_zombie1', condition: () => !Player.flags.road_zombie1_dead }
                ],
                exits: [
                    { label: 'Westen - Zurück nach Grauenfels', direction: 'west', target: 'city_square' },
                    { label: 'Osten - Nach Steinwacht', direction: 'east', target: 'steinwacht_gate', condition: () => Player.flags.road_skeleton1_dead && Player.flags.road_skeleton2_dead && Player.flags.road_zombie1_dead }
                ]
            },
            objects: [
                { type: 'enemy', id: 'road_skeleton1', name: 'Wanderndes Skelett', enemyId: 'skeleton', x: 25, y: 45, width: 10, height: 14 },
                { type: 'enemy', id: 'road_skeleton2', name: 'Wanderndes Skelett', enemyId: 'skeleton', x: 55, y: 40, width: 10, height: 14 },
                { type: 'enemy', id: 'road_zombie1', name: 'Verlorener Wanderer', enemyId: 'zombie', x: 75, y: 50, width: 10, height: 14 }
            ],
            enemies: []
        },
        
        // ===== STEINWACHT - SECOND CITY =====
        'steinwacht_gate': {
            id: 'steinwacht_gate',
            name: 'Tor von Steinwacht',
            description: 'Eine befestigte Stadt auf einem Hügel',
            background: 'bg-village',
            navigation: {
                interactions: [
                    { label: 'Torwache ansprechen', action: 'talk', target: 'steinwacht_guard' }
                ],
                exits: [
                    { label: 'Westen - Zurück zur Straße', direction: 'west', target: 'road_to_steinwacht' },
                    { label: 'In die Stadt', direction: 'enter', target: 'steinwacht_square' }
                ]
            },
            objects: [
                { type: 'npc', id: 'steinwacht_guard', name: 'Torwächter', x: 35, y: 45, width: 10, height: 14 }
            ],
            enemies: []
        },
        'steinwacht_square': {
            id: 'steinwacht_square',
            name: 'Marktplatz von Steinwacht',
            description: 'Eine geschäftige Stadt, besser erhalten als Grauenfels',
            background: 'bg-village',
            navigation: {
                interactions: [
                    { label: 'Aldric ansprechen', action: 'talk', target: 'aldric', condition: () => Player.hasItem('signet_ring') || Player.flags.met_aldric },
                    { label: 'Krämer ansprechen', action: 'talk', target: 'steinwacht_merchant' },
                    { label: 'Alte Martha ansprechen', action: 'talk', target: 'steinwacht_old_woman' },
                    { label: 'Kriegsveteran ansprechen', action: 'talk', target: 'war_veteran' },
                    { label: 'Weinende Mutter ansprechen', action: 'talk', target: 'grieving_mother' },
                    { label: 'Händler im Streit ansprechen', action: 'talk', target: 'arguing_merchant' }
                ],
                exits: [
                    { label: 'Süden - Zum Tor', direction: 'south', target: 'steinwacht_gate' },
                    { label: 'Osten - Zur Schmiede', direction: 'east', target: 'steinwacht_smithy' },
                    { label: 'Westen - Zum Archiv', direction: 'west', target: 'steinwacht_archive', condition: () => Player.flags.archive_unlocked },
                    { label: 'Norden - Trainingsgelände', direction: 'north', target: 'training_grounds' }
                ]
            },
            objects: [
                { type: 'npc', id: 'aldric', name: 'Der alte Aldric', x: 25, y: 50, width: 10, height: 14 },
                { type: 'npc', id: 'steinwacht_merchant', name: 'Krämer Wilhelm', x: 50, y: 35, width: 10, height: 14 },
                { type: 'npc', id: 'steinwacht_old_woman', name: 'Alte Martha', x: 75, y: 50, width: 8, height: 12 },
                { type: 'npc', id: 'war_veteran', name: 'Kriegsveteran Oskar', x: 10, y: 65, width: 10, height: 14 },
                { type: 'npc', id: 'grieving_mother', name: 'Weinende Mutter', x: 85, y: 35, width: 8, height: 12 },
                { type: 'npc', id: 'arguing_merchant', name: 'Aufgeregter Händler', x: 60, y: 65, width: 8, height: 14 }
            ],
            enemies: []
        },
        'training_grounds': {
            id: 'training_grounds',
            name: 'Trainingsgelände',
            description: 'Hier werden Krieger und Jäger ausgebildet',
            background: 'bg-forest-path',
            navigation: {
                interactions: [
                    { label: 'Alten Ritter ansprechen', action: 'talk', target: 'sword_master' },
                    { label: 'Jäger ansprechen', action: 'talk', target: 'bow_master' }
                ],
                exits: [
                    { label: 'Süden - Zum Marktplatz', direction: 'south', target: 'steinwacht_square' }
                ]
            },
            objects: [
                { type: 'npc', id: 'sword_master', name: 'Ritter Gareth', x: 30, y: 45, width: 12, height: 16 },
                { type: 'npc', id: 'bow_master', name: 'Jäger Roland', x: 65, y: 50, width: 10, height: 14 }
            ],
            enemies: []
        },
        'steinwacht_smithy': {
            id: 'steinwacht_smithy',
            name: 'Schmiede von Steinwacht',
            description: 'Eine gut ausgestattete Schmiede',
            background: 'bg-house-interior',
            navigation: {
                interactions: [
                    { label: 'Schmied ansprechen', action: 'talk', target: 'steinwacht_blacksmith' }
                ],
                exits: [
                    { label: 'Westen - Zum Marktplatz', direction: 'west', target: 'steinwacht_square' }
                ]
            },
            objects: [
                { type: 'npc', id: 'steinwacht_blacksmith', name: 'Meisterschmied Torben', x: 50, y: 40, width: 12, height: 16 }
            ],
            enemies: []
        },
        'steinwacht_archive': {
            id: 'steinwacht_archive',
            name: 'Stadtarchiv von Steinwacht',
            description: 'Ein altes Gebäude voller Bücher und Dokumente',
            background: 'bg-house-interior',
            navigation: {
                interactions: [
                    { label: 'Archivar ansprechen', action: 'talk', target: 'archivist' },
                    { label: 'Familienregister durchsuchen', action: 'examine', target: 'family_records', condition: () => Player.flags.can_search_records && !Player.flags.found_family_records }
                ],
                exits: [
                    { label: 'Osten - Zum Marktplatz', direction: 'east', target: 'steinwacht_square' }
                ]
            },
            objects: [
                { type: 'npc', id: 'archivist', name: 'Archivar Benedikt', x: 50, y: 40, width: 10, height: 14 },
                { type: 'examine', id: 'family_records', name: 'Familienregister', x: 70, y: 30, width: 15, height: 10, examineText: '*Du findest einen Eintrag* "Familie Rabenstein - Diener des Hofes seit fünf Generationen. Letzter Eintrag: Drei Kinder - Korvin (ältester Sohn), [dein Name unleserlich] (mittlerer Sohn), und Elara (Tochter). VERMERK: Familie unter Verdacht der Kollaboration mit dem Schattenfürst. Zwei der Kinder wurden für Verrat hingerichtet. Die Tochter wurde gefangengenommen."' }
            ],
            enemies: []
        },
    }
};


// Ende GameData
