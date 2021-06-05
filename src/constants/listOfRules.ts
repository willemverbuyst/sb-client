export const listOfRules: Array<{ question: string; answers: string[] }> = [
  {
    question: 'Hoeveel punten kan ik verdienen per wedstrijd?',
    answers: [
      'Het aantal goals per team goed voorspeld: 2 punten (dus 2x2 punten te verdienen',
      'Een winner of gelijkspel goed voorspeld: 5 punten',
      'Een volledige uitslag goed voorspeld: 1 punt',
      'De punten tellen op, dus als de gehele uitslag goed is, voorspeld verdien je in totaal 10 punten.',
    ],
  },
  {
    question: 'Hoeveel totorondes worden er gespeeld?',
    answers: [
      'Er worden in totaal 11 totorondes per seizoen gespeeld.',
      'Elke totoronde duurt 3 speelrondes.',
      'Behalve de laatste totoronde, die bestaat uit 4 speelrondes.',
    ],
  },
  {
    question: 'Wat is de totaaltoto?',
    answers: [
      'Naast de reguliere totorondes, is er ook een Totaaltoto.',
      'Dit is een aparte toto dat bestaat uit alle 34 speelrondes.',
      'Degene die aan het eind de meeste punten heeft verdiend, wint de Totaaltoto.',
    ],
  },
  {
    question: 'Wanneer ben je de winnaar van de toto?',
    answers: [
      'Na afloop van de laatste speelronde van een spel worden alle punten bij elkaar opgeteld.',
      'Degene met de meeste punten wint.',
      'Een spel heeft pas een winnaar als er minimaal 90% is gespeeld. Zodra bekend wordt wat er gebeurt met eventuele ontbrekende wedstrijden in een spel zullen we daarom bekijken of er wordt voldaan aan de 90%. Zo ja, dan keren we uit aan degene(n) die op dat moment bovenaan staan. Zo nee, dan blijft de inleg van dit spel staan voor een volgend spel.',
    ],
  },
  {
    question: 'Wat gebeurt er als ik mijn punten niet heb ingezet?',
    answers: [
      'Wanneer een speler geen voorspelling heeft gedaan dan wordt er géén score genoteerd.',
      'Er zijn dan ook geen punten te behalen op deze wedstrijd.',
    ],
  },
];
