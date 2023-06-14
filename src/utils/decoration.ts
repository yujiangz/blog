export function getColorCode(): string {
  const colors: string[] = [
    "#f07c82", // 香叶红
    "#ee3f4d", // 桃花红
    "#de1c31", // 唐菖蒲红
    "#ed556a", // 山茶红
    "#f03752", // 海棠红
    "#e77c8e", // 淡茜红
    "#ec9bad", // 粉团花红
    "#eeb8c3", // 姜红
    "#c08eaf", // 萝兰紫
    "#806d9e", // 槿紫
    "#525288", // 野菊紫
    "#61649f", // 山梗紫
    "#2b73af", // 品蓝
    "#2376b7", // 花青
    "#5698c3", // 睛蓝
    "#1772b4", // 群青
    "#1781b5", // 釉蓝
    "#12aa9c", // 美蝶绿
    "#45b787", // 蛙绿
    "#ffd111", // 藤黄
    "#feba07", // 琥珀黄
    "#fca106", // 枇杷黄
    "#f26b1f", // 金黄
    "#f86b1d", // 金莲花橙
  ];
  return colors[~~(Math.random() * colors.length)];
}

export function getSvgOfPath(width = 200, height = 200) {
  let paths = [];
  for (let i = 0; i < 5; i++) {
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * height);
    const rx = Math.floor(Math.random() * width);
    const ry = Math.floor(Math.random() * height);
    const xAxisRotation = Math.floor(Math.random() * 180);
    const largeArcFlag = Math.floor(Math.random() * 2);
    const sweepFlag = Math.floor(Math.random() * 2);
    paths.push(
      `M ${x} ${y} a ${rx} ${ry} ${xAxisRotation} ${largeArcFlag} ${sweepFlag} ${x} ${y}`
    );
  }
  return paths.join(" ");
}
