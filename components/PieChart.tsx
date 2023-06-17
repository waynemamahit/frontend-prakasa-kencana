import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import { useEffect } from 'react';

export default function PieChart({
  label,
  rootLabel,
  height,
  theme,
  data,
}: {
  label: string;
  rootLabel: string;
  theme: any;
  data: unknown[];
  height: string | number;
}) {
  useEffect(() => {
    // Create Root
    const root = am5.Root.new(rootLabel);
    // Set themes
    root.setThemes([theme.new(root)]);
    // Create chart
    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
        innerRadius: 100,
      })
    );
    // Add label
    const chartLabel = root.tooltipContainer.children.push(
      am5.Label.new(root, {
        x: am5.p50,
        y: am5.percent(42),
        centerX: am5.p50,
        centerY: am5.p50,
        fill: am5.color(0x000000),
        fontSize: 24,
      })
    );
    chartLabel.set('text', label);
    // Create series
    let series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: 'value',
        categoryField: 'category',
        scale: 0.65,
      })
    );
    // Set data
    series.data.setAll(data);
    // Create legend
    const legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        marginTop: 15,
        marginBottom: 15,
      })
    );
    legend.data.setAll(series.dataItems);
    series.appear(1000, 100).catch((err) => alert(err));
  });
  return <div id={rootLabel} style={{ width: '100%', height }}></div>;
}
