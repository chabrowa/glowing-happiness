//broken, crushed, flawed, nothing, perfect

var qualities = [
  {
    name: 'Broken ',
    level: 1,
    multiplier: 1,
    image: '/images/stones/1-broken-stone.svg'
  },
  {
    name: 'Crushed ',
    level: 2,
    multiplier: 2,
    image: '/images/stones/2-crushed-stone.svg'
  },
  {
    name: 'Flawed ',
    level: 3,
    multiplier: 3,
    image: '/images/stones/3-flawed-stone.svg'
  },
  {
    name: '',
    level: 4,
    multiplier: 4,
    image: '/images/stones/4-stone.svg'
  },
  {
    name: 'Perfect ',
    level: 5,
    multiplier: 5,
    image: '/images/stones/5-perfect-stone.svg'
  }
];
var stoneBase = [
  {
    name: 'Amethyst',
    characteristics: [{name: 'health', value: 5}, {name: 'strength', value: 1}],
    color: '#590242',
    type: 'stone'
  },
  {
    name: 'Ruby',
    characteristics: [{name: 'defence', value: 1}, {name: 'strength', value: 1}],
    color: '#BF0404',
    type: 'stone'
  },
    {
    name: 'Sapphire',
    characteristics: [{name: 'luck', value: 5}, {name: 'speed', value: 1}],
    color: '#03178C',
    type: 'stone'
  },
    {
    name: 'Opal',
    characteristics: [{name: 'defence', value: 1}, {name: 'dexterity', value: 1}],
    color: '#FCF8A7',
    type: 'stone'
  },
    {
    name: 'Onyx',
    characteristics: [{name: 'health', value: 10}, {name: 'luck', value: -5}, {name: 'dexterity', value: 1}],
    color: '#000000',
    type: 'stone'
  },
    {
    name: 'Malachite',
    characteristics: [{name: 'defence', value: 3}, {name: 'strength', value: -1}],
    color: '#00754A',
    type: 'stone'
  },
    {
    name: 'Topaz',
    characteristics: [{name: 'dexterity', value: 2}, {name: 'strength', value: -2}, {name: 'speed', value: 2}],
    color: '#BE5C01',
    type: 'stone'
  }
];

Stones = [];

qualities.forEach(function(quality) {
  stoneBase.forEach(function(stone) {
    var completeStone = {
      color: stone.color,
      name: quality.name + stone.name,
      level: quality.level,
      image: quality.image,
      type: 'stone',
      characteristics: stone.characteristics.map(function(char) {
        var result = {
          name: char.name,
          value: char.value * quality.multiplier
        };
        return result;
      })
    };
    Stones.push(completeStone);
  });
});

//chipped, flawed, nothing, flawless, perfect, radiant, square, flawless square, perfect square, radiant square, star, flawless star, perfect star, radiant star, marquise, imperial, flawless imperial, royal, flawless royal
