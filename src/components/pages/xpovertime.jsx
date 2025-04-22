import React, { useMemo } from "react";
import ReactApexChart from "react-apexcharts";

const XpOverTimeChart = ({ transactions }) => {
  
  // Process and aggregate the data
  const processedData = useMemo(() => {
    if (!transactions || !Array.isArray(transactions)) {
      return [];
    }

    // Group XP by module
    const moduleXP = transactions.reduce((acc, tx) => {
      if (!tx.path || !tx.path.includes('/bh-module')) return acc;
      
      // Extract module name from path
      const modulePath = tx.path.split('/').filter(Boolean);
      // Get the last meaningful part of the path
      let moduleName = 'unknown';
      for (let i = modulePath.length - 1; i >= 0; i--) {
        if (!modulePath[i].match(/^(find|using)/) && modulePath[i] !== 'bh-module') {
          moduleName = modulePath[i];
          break;
        }
      }
      
      // Sum up XP for each module
      acc[moduleName] = (acc[moduleName] || 0) + (tx.amount || 0);
      return acc;
    }, {});

    // Convert to array format required by ApexCharts
    return Object.entries(moduleXP)
      .map(([module, xp]) => ({
        x: module.replace(/-/g, ' '), // Make module names more readable
        y: Math.round(xp) // Round XP to whole numbers
      }))
      .sort((a, b) => b.y - a.y); // Sort by XP amount in descending order
  }, [transactions]);

  const chartOptions = {
    chart: {
      type: "bar",
      height: 350,
      background: 'transparent',
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        dynamicAnimation: {
          speed: 350
        }
      },
      toolbar: {
        show: false
      }
    },
    title: {
      text: "Most XP Earned Per Project ",
      align: "center",
      style: {
        fontSize: '20px',
        fontWeight: '600',
        color: 'var(--text-primary)'
      }
    },
    xaxis: {
      type: "category",
      title: {
        text: "Project",
        style: {
          fontSize: '14px',
          color: 'var(--text-secondary)'
        }
      },
      labels: {
        rotate: -45,
        trim: true,
        style: {
          fontSize: '12px',
          colors: 'var(--text-secondary)'
        }
      }
    },
    yaxis: {
      title: {
        text: "XP Amount",
        style: {
          fontSize: '14px',
          color: 'var(--text-secondary)'
        }
      },
      labels: {
formatter: (value) => `${(value / 1000).toFixed(1).replace(/\.0$/, "") + "k"} XP`,
        style: {
          colors: 'var(--text-secondary)'
        }
      }
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: (value) => `${(value / 1000).toFixed(2).replace(/\.0$/, "") + "k"} XP`,
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        dataLabels: {
          position: 'top'
        },
        columnWidth: '60%',
        colors: {
          ranges: [{
            from: 0,
            to: Infinity,
            color: 'var(--accent-blue)'
          }]
        }
      }
    },
    dataLabels: {
      enabled: true,
      formatter: (value) => `${(value / 1000).toFixed(2).replace(/\.0$/, "") + "k"} XP`,
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ["var(--text-primary)"]
      }
    },
    grid: {
      borderColor: 'rgba(255, 255, 255, 0.05)',
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: true
        }
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        type: 'vertical',
        shadeIntensity: 0.5,
        gradientToColors: ['var(--accent-blue)'],
        inverseColors: false,
        opacityFrom: 0.8,
        opacityTo: 0.3,
        stops: [0, 100]
      }
    }
  };

  const series = [
    {
      name: "XP",
      data: processedData
    }
  ];

  return (
    <div className="xp-chart-container">
      <ReactApexChart 
        options={chartOptions} 
        series={series} 
        type="bar" 
        height={350}
        className="xp-chart"
      />
    </div>
  );
};

export default XpOverTimeChart;
