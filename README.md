# Schatten von Dunkelheim - Modulare Version

## 📱 APK ERSTELLEN - SCHRITT FÜR SCHRITT

### Schritt 1: Icons generieren
1. Öffne `ICON-GENERATOR.html` im Browser
2. Klicke "Icons generieren"
3. Lade ALLE Icons herunter (8 Stück)
4. Speichere sie in `assets/icons/`

### Schritt 2: Auf GitHub hochladen
1. Gehe zu https://github.com und erstelle ein Konto (falls nötig)
2. Klicke "New Repository"
3. Name: `schatten-von-dunkelheim`
4. Klicke "Create repository"
5. Klicke "uploading an existing file"
6. Ziehe ALLE Dateien/Ordner rein (außer ICON-GENERATOR.html)
7. Klicke "Commit changes"

### Schritt 3: GitHub Pages aktivieren
1. Im Repository → "Settings"
2. Links → "Pages"
3. Source: "Deploy from a branch"
4. Branch: "main" und "/ (root)"
5. Klicke "Save"
6. Warte 2-3 Minuten
7. Deine URL: `https://DEINNAME.github.io/schatten-von-dunkelheim/`

### Schritt 4: APK erstellen
1. Gehe zu https://www.pwabuilder.com
2. Gib deine GitHub-Pages-URL ein
3. Klicke "Start"
4. Warte auf die Analyse
5. Klicke "Package for stores"
6. Wähle "Android"
7. Klicke "Generate"
8. Lade die APK herunter!

### Schritt 5: APK installieren
1. Übertrage die APK auf dein Android-Handy
2. Öffne die APK
3. Erlaube "Installation aus unbekannten Quellen"
4. Installieren → Fertig! 🎮

---

## 📁 Projektstruktur

```
schatten-von-dunkelheim/
├── index.html          (313 Zeilen)   - HTML-Struktur
├── css/
│   └── styles.css      (1585 Zeilen)  - Alle Styles
├── js/
│   ├── game-data.js    (3591 Zeilen)  - Spieldaten
│   └── game-engine.js  (2979 Zeilen)  - Spiellogik
├── assets/
│   └── images/         (leer)         - Hier kommen Bilder hin
└── README.md           (Diese Datei)
```

## 🎮 So funktioniert die Zusammenarbeit

### Neues Item hinzufügen
Sag mir: *"Füge ein neues Schwert hinzu: Name X, Schaden Y"*
→ Ich gebe dir nur den Code-Block für `game-data.js`

### Neuen Gegner hinzufügen
Sag mir: *"Neuer Gegner: Goblin mit 30 HP, 5 Schaden"*
→ Ich zeige dir nur den Eintrag für `enemies` in `game-data.js`

### Neue Szene/Location hinzufügen
Sag mir: *"Neue Location: Friedhof mit 2 Skeletten"*
→ Ich gebe dir den Code für `scenes` in `game-data.js`

### Neuen NPC mit Dialog hinzufügen
Sag mir: *"Neuer NPC: Händler der Tränke verkauft"*
→ Ich gebe dir den Code für `npcs` in `game-data.js`

### Kampfsystem ändern
Sag mir: *"Ändere die Schadensberechnung"*
→ Ich zeige dir die relevante Funktion in `game-engine.js`

### CSS/Design ändern
Sag mir: *"Mach die Lebensleiste breiter"*
→ Ich zeige dir die CSS-Änderung für `styles.css`

---

## 🖼️ Bilder hinzufügen (GitHub-Methode)

### Schritt 1: GitHub Repository erstellen
1. Gehe zu https://github.com
2. Erstelle ein neues Repository namens `dunkelheim-assets`
3. Lade deine Bilder in einen `images/` Ordner hoch

### Schritt 2: Bild-URLs im Code verwenden
Die URL-Struktur ist:
```
https://raw.githubusercontent.com/DEIN_USERNAME/dunkelheim-assets/main/images/BILDNAME.png
```

### Schritt 3: Im Code einfügen
In `game-data.js` bei Items/Enemies:
```javascript
'goblin': {
    name: 'Goblin',
    icon: '👺',  // Emoji als Fallback
    image: 'https://raw.githubusercontent.com/DEIN_USERNAME/dunkelheim-assets/main/images/goblin.png',
    // ...
}
```

---

## 📝 Schnelle Bearbeitungs-Beispiele

### Beispiel 1: Neues Item
```javascript
// In game-data.js unter items: hinzufügen
'flame_sword': {
    id: 'flame_sword',
    name: 'Flammenschwert',
    type: 'weapon',
    slot: 'weapon',
    icon: '🔥',
    damage: 15,
    description: 'Eine Klinge die in Flammen gehüllt ist.',
    value: 200,
    stackable: false
},
```

### Beispiel 2: Neuer Gegner
```javascript
// In game-data.js unter enemies: hinzufügen
'goblin': {
    id: 'goblin',
    name: 'Goblin',
    icon: '👺',
    health: 25,
    damage: 6,
    defense: 1,
    dexterity: 4,
    xp: 15,
    gold: [5, 15],
    loot: [
        { itemId: 'gold_coin', chance: 1.0, quantity: [3, 8] }
    ]
},
```

### Beispiel 3: Neue Scene
```javascript
// In game-data.js unter scenes: hinzufügen
'graveyard': {
    id: 'graveyard',
    name: 'Friedhof',
    description: 'Ein nebliger Friedhof mit schiefen Grabsteinen.',
    background: 'bg-graveyard',
    objects: [
        { type: 'enemy', enemyId: 'skeleton', x: 30, y: 50, width: 60, height: 80 },
        { type: 'enemy', enemyId: 'ghost', x: 70, y: 40, width: 50, height: 70 }
    ],
    exits: [
        { direction: 'Zurück zum Dorf', targetScene: 'village' }
    ]
},
```

---

## 🚀 Spiel starten

1. Öffne `index.html` in einem Browser
2. Oder hoste es auf GitHub Pages / Netlify / etc.

---

## ⚠️ Wichtig

- **Reihenfolge der Scripts**: `game-data.js` muss VOR `game-engine.js` geladen werden
- **Kommas nicht vergessen**: Nach jedem Objekt-Block ein Komma (außer beim letzten)
- **IDs müssen einzigartig sein**: Keine doppelten Item/Enemy/Scene IDs

---

## 📊 Datei-Übersicht

| Datei | Inhalt | Wann bearbeiten? |
|-------|--------|------------------|
| `index.html` | HTML-Struktur | Selten - nur für neue UI-Elemente |
| `styles.css` | Design/Layout | Für visuelle Änderungen |
| `game-data.js` | Items, Gegner, NPCs, Szenen, Dialoge | Am häufigsten! |
| `game-engine.js` | Spielmechaniken | Für Logik-Änderungen |
