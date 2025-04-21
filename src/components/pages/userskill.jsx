import React, { useMemo } from "react";
import ReactApexChart from "react-apexcharts";

const UserSkill = ({ skillData }) => {
  const processedData = useMemo(() => {
    if (!skillData?.transaction || !Array.isArray(skillData.transaction)) {
      return { categories: [], values: [] };
    }

    // Initialize skill sums object
    const skillSums = {
      'Go': 0,
      'Front-end': 0,
      'Back-end': 0,
      'HTML': 0,
      'CSS': 0,
      'Algo': 0,
      'JS': 0,
      'Prog': 0
    };

    // Sum up amounts for each skill type
    skillData.transaction.forEach(trans => {
      const skillType = trans.type.replace('skill_', '').toLowerCase();
      
      if (skillType === 'go') skillSums['Go'] += trans.amount;
      else if (skillType === 'front-end') skillSums['Front-end'] += trans.amount;
      else if (skillType === 'back-end') skillSums['Back-end'] += trans.amount;
      else if (skillType === 'html') skillSums['HTML'] += trans.amount;
      else if (skillType === 'css') skillSums['CSS'] += trans.amount;
      else if (skillType === 'algo') skillSums['Algo'] += trans.amount;
      else if (skillType === 'js') skillSums['JS'] += trans.amount;
      else if (skillType === 'prog') skillSums['Prog'] += trans.amount;
    });

    // Convert to arrays for ApexCharts
    return {
        //getting the name of each skill from the object skillSums
        categories: Object.keys(skillSums),
        //getting the value of each skill from the object skillSums
        values: Object.values(skillSums)
    };
  }, [skillData]);

  const chartOptions = {
    chart: {
      height: 400,
      type: 'radar',
      toolbar: {
        show: false
      },
      background: 'transparent',
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800
      }
    },
    title: {
      text: 'Skill Distribution',
      align: 'center',
      style: {
        fontSize: '20px',
        fontWeight: '600',
        color: 'var(--text-primary)'
      }
    },
    xaxis: {
      categories: processedData.categories,
      labels: {
        style: {
          fontSize: '14px',
          fontWeight: '500'
        }
      }
    },
    yaxis: {
      show: true,
      labels: {
        formatter: (val) => Math.round(val),
        style: {
          colors: 'var(--text-secondary)'
        }
      }
    },
    markers: {
      size: 5,
      colors: ['var(--accent-blue)'],
      strokeWidth: 0,
      hover: {
        size: 7
      }
    },
    tooltip: {
      theme: 'dark',
      style: {
        fontSize: '14px'
      },
      y: {
        formatter: (val) => Math.round(val) + ' points'
      }
    },
    stroke: {
      width: 2,
      colors: ['var(--accent-blue)']
    },
    fill: {
      opacity: 0.2,
      colors: ['var(--accent-blue)']
    },
    grid: {
      show: true,
      strokeDashArray: 3,
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    plotOptions: {
      radar: {
        polygons: {
          strokeColors: 'rgba(255, 255, 255, 0.05)',
          connectorColors: 'rgba(255, 255, 255, 0.05)',
          fill: {
            colors: ['transparent']
          }
        }
      }
    }
  };

  const series = [{
    name: 'Skill Points',
    data: processedData.values //values for the Y axis
  }];

  if (!skillData?.transaction || skillData.transaction.length === 0) {
    return <div>No skill data to display</div>;
  }

  return (
    <div className="skill-chart-container">
      <ReactApexChart
        options={chartOptions}
        series={series}
        type="radar"
        height={400}
        className="skill-chart"
      />
    </div>
  );
};

export default UserSkill;
