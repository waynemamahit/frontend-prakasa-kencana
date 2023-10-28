import { BaseChart } from '@/models/Chart';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import { useEffect } from 'react';

export default function ColumnChart({
  rootLabel,
  theme,
  data,
  height,
}: BaseChart) {
  useEffect(() => {
    // Create Root
    let root = am5.Root.new(rootLabel);
    // Set themes
    root.setThemes([theme.new(root)]);
    // Create chart
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: 'none',
        wheelY: 'none',
      })
    );
    // We don't want zoom-out button to appear while animating, so we hide it
    chart.zoomOutButton.set('forceHidden', true);
    // Create axes
    const xRenderer = am5xy.AxisRendererX.new(root, {
      minGridDistance: 30,
    });
    xRenderer.labels.template.setAll({
      rotation: 0,
      centerY: am5.p50,
      centerX: 20,
      paddingRight: 15,
    });
    xRenderer.grid.template.set('visible', false);
    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0.3,
        categoryField: 'country',
        renderer: xRenderer,
      })
    );
    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0.3,
        min: 0,
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );
    // Add series
    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: 'Series 1',
        xAxis,
        yAxis,
        valueYField: 'value',
        categoryXField: 'country',
      })
    );
    // Rounded corners for columns
    series.columns.template.setAll({
      cornerRadiusTL: 5,
      cornerRadiusTR: 5,
      strokeOpacity: 0,
    });
    // Make each column to be of a different color
    series.columns.template.adapters.add('fill', function (_, target) {
      return chart?.get('colors')?.getIndex(series.columns.indexOf(target));
    });
    series.columns.template.adapters.add('stroke', function (_, target) {
      return chart?.get('colors')?.getIndex(series.columns.indexOf(target));
    });
    // Add Label bullet
    series.bullets.push(function () {
      return am5.Bullet.new(root, {
        locationY: 1,
        sprite: am5.Label.new(root, {
          text: "{valueYWorking.formatNumber('#.')}",
          fill: root.interfaceColors.get('alternativeText'),
          centerY: 0,
          centerX: am5.p50,
          populateText: true,
        }),
      });
    });
    // Set data
    xAxis.data.setAll(data);
    series.data.setAll(data);
    // Make stuff animate on load
    const catchFunc = (err: any) => console.error(err);
    series.appear(1000).catch(catchFunc);
    chart.appear(1000, 100).catch(catchFunc);

    return () => root.dispose();
  });

  return <div id={rootLabel} style={{ width: '100%', height }}></div>;
}
