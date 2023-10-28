import { BaseChart } from '@/models/Chart';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import { useEffect } from 'react';

export default function StackedBarChart({
  rootLabel,
  theme,
  height,
  data,
}: BaseChart) {
  useEffect(() => {
    // Create root element
    const root = am5.Root.new(rootLabel);
    const myTheme = am5.Theme.new(root);
    myTheme.rule('Grid', ['base']).setAll({
      strokeOpacity: 0.1,
    });
    // Set themes
    root.setThemes([theme.new(root), myTheme]);
    // Create chart
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: 'panY',
        wheelY: 'zoomY',
        layout: root.verticalLayout,
      })
    );
    // Add scrollbar
    chart.set(
      'scrollbarY',
      am5.Scrollbar.new(root, {
        orientation: 'vertical',
      })
    );
    // Create axes
    let yRenderer = am5xy.AxisRendererY.new(root, {});
    let yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: 'category',
        renderer: yRenderer,
        tooltip: am5.Tooltip.new(root, {}),
      })
    );
    yRenderer.grid.template.setAll({
      location: 1,
    });
    yAxis.data.setAll(data);
    let xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        renderer: am5xy.AxisRendererX.new(root, {
          strokeOpacity: 0.1,
        }),
      })
    );
    // Add legend
    let legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50,
      })
    );
    // Add series
    const makeSeries = (name: string, fieldName: string) => {
      let series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: name,
          stacked: true,
          xAxis: xAxis,
          yAxis: yAxis,
          baseAxis: yAxis,
          valueXField: fieldName,
          categoryYField: 'category',
        })
      );
      series.columns.template.setAll({
        tooltipText: '{name}, {categoryY}: {valueX}',
        tooltipY: am5.percent(90),
      });
      series.data.setAll(data);
      // Make stuff animate on load
      series.appear().catch((err) => console.error(err));
      series.bullets.push(function () {
        return am5.Bullet.new(root, {
          sprite: am5.Label.new(root, {
            text: '{valueX}',
            fill: root.interfaceColors.get('alternativeText'),
            centerY: am5.p50,
            centerX: am5.p50,
            populateText: true,
          }),
        });
      });
      legend.data.push(series);
    };
    for (const key in data[0]) {
      if (key === 'category') continue;
      makeSeries(key.toUpperCase(), key);
    }

    return () => root.dispose();
  });

  return <div id={rootLabel} style={{ width: '100%', height }}></div>;
}
