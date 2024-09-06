const FIGURES = [
  square(),
  pipe(),
  gammaLeft(),
  gammaRight(),
  zRight(),
  zLeft(),
  piramide()
];

export function getRandomFigure() {
  return FIGURES[Math.floor(Math.random() * FIGURES.length)];
}

function square() {
  const props = { isEmpty: true, color: "yellow", name: "square" };

  return [
    { xFigure: 4, yFigure: 0, ...props },
    { xFigure: 5, yFigure: 0, ...props },
    { xFigure: 4, yFigure: 1, ...props },
    { xFigure: 5, yFigure: 1, ...props }
  ];
}

function pipe() {
  const props = {
    isEmpty: true,
    color: "aqua",
    name: "pipe",
    direction: "left"
  };

  return [
    { xFigure: 4, yFigure: 0, ...props, center: false },
    { xFigure: 4, yFigure: 1, ...props, center: true },
    { xFigure: 4, yFigure: 2, ...props, center: false },
    { xFigure: 4, yFigure: 3, ...props, center: false }
  ];
}

function gammaLeft() {
  const props = { isEmpty: true, color: "blue" };

  return [
    { xFigure: 3, yFigure: 0, ...props, center: false },
    { xFigure: 3, yFigure: 1, ...props, center: false },
    { xFigure: 4, yFigure: 1, ...props, center: true },
    { xFigure: 5, yFigure: 1, ...props, center: false }
  ];
}

function gammaRight() {
  const props = { isEmpty: true, color: "orange" };

  return [
    { xFigure: 3, yFigure: 1, ...props, center: false },
    { xFigure: 4, yFigure: 1, ...props, center: true },
    { xFigure: 5, yFigure: 1, ...props, center: false },
    { xFigure: 5, yFigure: 0, ...props, center: false }
  ];
}

function zRight() {
  const props = { isEmpty: true, color: "green" };

  return [
    { xFigure: 3, yFigure: 1, ...props, center: false },
    { xFigure: 4, yFigure: 1, ...props, center: true },
    { xFigure: 4, yFigure: 0, ...props, center: false },
    { xFigure: 5, yFigure: 0, ...props, center: false }
  ];
}

function zLeft() {
  const props = { isEmpty: true, color: "red" };

  return [
    { xFigure: 3, yFigure: 0, ...props, center: false },
    { xFigure: 4, yFigure: 0, ...props, center: false },
    { xFigure: 4, yFigure: 1, ...props, center: true },
    { xFigure: 5, yFigure: 1, ...props, center: false }
  ];
}

function piramide() {
  const props = { isEmpty: true, color: "purple" };

  return [
    { xFigure: 3, yFigure: 1, ...props, center: false },
    { xFigure: 4, yFigure: 0, ...props, center: false },
    { xFigure: 4, yFigure: 1, ...props, center: true },
    { xFigure: 5, yFigure: 1, ...props, center: false }
  ];
}
