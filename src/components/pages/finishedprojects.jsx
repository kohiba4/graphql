import React, { useMemo } from "react";
import ReactApexChart from "react-apexcharts";

const FinishedProjects = ({ projects }) => {
  const processedData = useMemo(() => {
    if (!projects?.result || !Array.isArray(projects.result)) {
      return [];
    }
  
    return projects.result.map((project, index) => ({
      x: new Date(project.createdAt).getTime(),
      y: index, // number index
      name: project.object?.name || "Unnamed Project",
      path: project.path,
      campus: project.campus,
      grade: project.grade
    })).sort((b, a) => a.x - b.x);
  }, [projects]);
  

  const chartOptions = {
    chart: {
      type: 'scatter',
      height: 450,
      animations: {
        speed: 400,
        animateGradually: {
          enabled: true
        }
      },
      toolbar: {
        show: true
      }
    },
    markers: {
      size: 10,
      hover: {
        size: 12
      }
    },
    xaxis: {
      type: 'datetime',
      labels: {
        format: 'MMM dd, yyyy',
        style: {
          fontSize: '12px'
        }
      },
      title: {
        text: 'Completion Date',
        style: {
          fontSize: '14px',
          fontWeight: 'bold'
        }
      }
    },
    yaxis: {
      tickAmount: processedData.length,
      labels: {
        formatter: (val) => {
          const item = processedData[Math.round(val)];
          return item?.name || '';
        },
        style: {
          fontSize: '12px'
        }
      },
      title: {
        text: 'Project Name',
        style: {
          fontSize: '14px',
          fontWeight: 'bold'
        }
      }
    },    
    tooltip: {
      custom: function({ seriesIndex, dataPointIndex, w }) {
        const point = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
        const date = new Date(point.x).toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        
        return `
          <div class="custom-tooltip">
            <b>${point.name}</b><br/>
            Completed: ${date}<br/>
            Campus: ${point.campus}<br/>
            Grade: ${point.grade.toFixed(2)}<br/>
            Path: ${point.path}
          </div>
        `;
      }
    },
    grid: {
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    colors: ['#008FFB'], // Single color for all points
    title: {
      text: 'Project Completion Timeline',
      align: 'center',
      style: {
        fontSize: '18px',
        fontWeight: 'bold'
      }
    }
  };

  const series = [{
    data: processedData
  }];

  if (!projects?.result || projects.result.length === 0) {
    return <div>No completed projects to display</div>;
  }

  return (
    <div>
      <ReactApexChart
        options={chartOptions}
        series={series}
        type="scatter"
        height={450}
        width={800}
      />
    </div>
  );
};

export default FinishedProjects;
