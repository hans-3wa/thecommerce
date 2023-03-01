export const personages = [
    { // 300 le nain attaque : 35 + (80 - 30 bouclier dragon) + (15-20) = 95 lance 5 des 14            14 * 0,95 //
        id: 0,
        breed: 'Nain',
        shield: {
            speed: 10,
            strength: 55,
            magic: 5
        }, // attack (35 - 20) + (80-30) + (15-20) = 60 +      5 lancé de des ( on va dire 14 ) 14 * 0.5 * 3(random 0-10)
        attack: {
            speed: 35,
            strength: 80,
            magic: 15,
        },
        pseudo: 'Gimli',
        luck: 50, // 0,5 * random 0-10
        pv: 100
    },
    {
        id: 1,
        breed: 'Dragon',
        shield: {
            speed: 20,
            strength: 30,
            magic: 20
        },
        attack: {
            speed: 60,
            strength: 50,
            magic: 10
        },
        pseudo: 'Smog',
        luck: 60,
        pv: 100
    },
    {
        id: 2,
        breed: 'Orc',
        shield: {
            speed: 10,
            strength: 60,
            magic: 10
        },
        attack: {
            speed: 50,
            strength: 90,
            magic: 0
        },
        pseudo: 'Crawl',
        luck: 30,
        pv: 100
    },
    {
        id: 3,
        breed: 'Elfe',
        shield: {
            speed: 35,
            strength: 5,
            magic: 40
        },
        attack: {
            speed: 60,
            strength: 10,
            magic: 40
        },
        pseudo: 'Legolas',
        luck: 60,
        pv: 100
    },
    {
        id: 4,
        breed: 'Sorcier',
        shield: {
            speed: 20,
            strength: 10,
            magic: 60
        },
        attack: {
            speed: 30,
            strength: 0,
            magic: 100
        },
        pseudo: 'Merlin',
        luck: 30,
        pv: 100
    },
    {
        id: 5,
        breed: 'Barbare',
        shield: {
            speed: 15,
            strength: 40,
            magic: 10
        },
        attack: {
            speed: 40,
            strength: 80,
            magic: 5
        },
        pseudo: 'Ragnar',
        luck: 60,
        pv: 100
    },
    {
        id: 6,
        breed: 'Vampire',
        shield: {
            speed: 30,
            strength: 20,
            magic: 20
        },
        attack: {
            speed: 60,
            strength: 30,
            magic: 20
        },
        pseudo: 'Dracula',
        luck: 70,
        pv: 100
    },
    {
        id: 7,
        breed: 'Gobelin',
        shield: {
            speed: 50,
            strength: 20,
            magic: 20
        },
        attack: {
            speed: 80,
            strength: 20,
            magic: 20
        },
        pseudo: 'Zoulzg',
        luck: 40,
        pv: 100
    }
]