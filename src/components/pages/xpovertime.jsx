import React, { useMemo } from "react";
import ReactApexChart from "react-apexcharts";

const XpOverTimeChart = ({ transactions }) => {
  
  // Process and aggregate the data
  const processedData = useMemo(() => {
    if (!transactions || !Array.isArray(transactions)) {
      return <div>Loading chart...</div>;
    }
    // Group XP by module
    const moduleXP = transactions.reduce((acc, tx) => {
      if (!tx.path) return acc;
      
      // Extract module name from path
      const modulePath = tx.path.split('/').filter(Boolean);
      const moduleName = modulePath[modulePath.length - 1] || modulePath[modulePath.length - 2] || 'unknown';
      
      // Sum up XP for each module
      acc[moduleName] = (acc[moduleName] || 0) + (tx.amount || 0);
      return acc;
    }, {});

    // Convert to array format required by ApexCharts
    return Object.entries(moduleXP).map(([module, xp]) => ({
      x: module.replace(/-/g, ' '), // Make module names more readable
      y: Math.round(xp) // Round XP to whole numbers
    }));
  }, [transactions]);

  const chartOptions = {
    chart: {
      type: "bar",
      height: 350,
      animations: {
        enabled: true,
        dynamicAnimation: {
          speed: 350
        }
      },
      toolbar: {
        show: true
      }
    },
    title: {
      text: "XP Earned per Module",
      align: "center",
      style: {
        fontSize: '18px',
        fontWeight: 'bold'
      }
    },
    xaxis: {
      type: "category",
      title: {
        text: "Module",
        style: {
          fontSize: '14px'
        }
      },
      labels: {
        rotate: -45,
        trim: true,
        style: {
          fontSize: '12px'
        }
      }
    },
    yaxis: {
      title: {
        text: "XP Amount",
        style: {
          fontSize: '14px'
        }
      },
      labels: {
        formatter: (value) => Math.round(value)
      }
    },
    tooltip: {
      y: {
        formatter: (value) => `${Math.round(value)} XP`
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        dataLabels: {
          position: 'top'
        }
      }
    },
    dataLabels: {
      enabled: true,
      formatter: (value) => `${Math.round(value)} XP`,
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ["#304758"]
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
    <div>
      <ReactApexChart 
        options={chartOptions} 
        series={series} 
        type="bar" 
        height={350}
      />
    </div>
  );
};

export default XpOverTimeChart;
