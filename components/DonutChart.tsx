import { BaseChart } from '@/models/Chart';
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import { useEffect } from 'react';

export default function DonutChart({
  label,
  rootLabel,
  height,
  theme,
  data,
}: BaseChart) {
  useEffect(() => {
    // Create Root
    const root = am5.Root.new(rootLabel);
    // Set themes
    root.setThemes([theme.new(root)]);
    // Create chart
    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
        innerRadius: height / 2 - height / 3.25,
      })
    );
    // Add label
    const chartLabel = root.tooltipContainer.children.push(
      am5.Label.new(root, {
        x: am5.p50,
        y: height / 1.3,
        centerX: am5.p50,
        centerY: am5.p50,
        fill: am5.color(0x000000),
        fontSize: 20,
      })
    );
    chartLabel.set('text', label);
    // Create series
    let series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: 'value',
        categoryField: 'category',
        scale: 0.8,
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
