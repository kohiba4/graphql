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
        show: true
      }
    },
    title: {
      text: 'Skill Distribution',
      align: 'center',
      style: {
        fontSize: '18px',
        fontWeight: 'bold'
      }
    },
    xaxis: {
      categories: processedData.categories,
      labels: {
        style: {
          fontSize: '14px'
          
        }
      }
    },
    yaxis: {
      show: true,
      labels: {
        formatter: (val) => Math.round(val)
      }
    },
    markers: {
      size: 5,
      hover: {
        size: 7,
        colors: ['#000000']
      }
    },
    tooltip: {
      y: {
        formatter: (val) => Math.round(val)
      }
    },
    theme: {
      palette: 'palette1'
    },
    stroke: {
      width: 2,
    },
    fill: {
      opacity: 0.25,
      
    },
    // options: {
    //     plotOptions: {
    //         radar: {
    //             polygons: {
    //                 strokeColors: '#e0e0e0',
    //                 fill: {
    //                     colors: ['#f8f8f8', '#fff']
    //                 }
    //             }
    //         }
    //     }
    // }
  };

  const series = [{
    name: 'Skill Points',
    data: processedData.values //values for the Y axis
  }];

  if (!skillData?.transaction || skillData.transaction.length === 0) {
    return <div>No skill data to display</div>;
  }

  return (
    <div>
      <ReactApexChart
        options={chartOptions}
        series={series}
        type="radar"
        height={400}
      />
    </div>
  );
};

export default UserSkill;
