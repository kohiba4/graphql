import React, { useMemo } from "react";
import ReactApexChart from "react-apexcharts";

const FinishedProjects = ({ projects }) => {
  const processedData = useMemo(() => {
    if (!projects?.result || !Array.isArray(projects.result)) {
      return [];
    }
  
    return projects.result.map((project, index) => ({
      x: new Date(project.createdAt).getTime(),
      y: index,
      name: project.object?.name || "Unnamed Project",
      path: project.path,
      campus: project.campus,
      grade: project.grade
    })).sort((a, b) => b.x - a.x);
  }, [projects]);
  
  const chartOptions = {
    chart: {
      height: 350,
      type: 'scatter',
      zoom: {
        enabled: false
      },
      background: 'transparent',
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800
      },
      dropShadow: {
        enabled: true,
        top: 3,
        left: 2,
        blur: 4,
        opacity: 0.2,
        color: 'var(--accent-blue)'
      },
      toolbar: {
        show: false
      }
    },
    markers: {
      size: 8,
      colors: ['var(--accent-blue)'],
      strokeColors: 'transparent',
      hover: {
        size: 10,
        sizeOffset: 3
      }
    },
    xaxis: {
      type: 'datetime',
      labels: {
        style: {
          colors: 'var(--text-secondary)',
          fontSize: '12px'
        },
        format: 'MMM dd, yyyy'
      },
      title: {
        text: 'Start Date',
        style: {
          color: 'var(--text-secondary)',
          fontSize: '14px',
          fontWeight: '500'
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
          colors: 'var(--text-secondary)',
          fontSize: '12px'
        }
      },
      title: {
        text: 'Project Name',
        style: {
          color: 'var(--text-secondary)',
          fontSize: '14px',
          fontWeight: '500'
        }
      }
    },
    tooltip: {
      theme: 'dark',
      custom: function({ seriesIndex, dataPointIndex, w }) {
        const point = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
        const date = new Date(point.x).toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        
        return `
          <div class="project-tooltip">
            <div class="tooltip-title">${point.name}</div>
            <div class="tooltip-content">
              <div>Started: ${date}</div>
              <div>Campus: ${point.campus}</div>
              <div>Grade: ${point.grade.toFixed(2)}</div>
              <div class="tooltip-path">Path: ${point.path}</div>
            </div>
          </div>
        `;
      }
    },
    grid: {
      borderColor: 'rgba(255, 255, 255, 0.05)',
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
    },
    title: {
      text: 'Project Completion Timeline',
      align: 'center',
      style: {
        fontSize: '20px',
        fontWeight: '600',
        color: 'var(--text-primary)'
      }
    }
  };

  const series = [{
    name: 'Projects',
    data: processedData
  }];

  if (!projects?.result || projects.result.length === 0) {
    return (
      <div className="projects-container">
        <h2 className="projects-title">Project Timeline</h2>
        <div className="empty-message">No completed projects to display</div>
      </div>
    );
  }

  return (
    <div className="projects-container">
      <ReactApexChart
        options={chartOptions}
        series={series}
        type="scatter"
        height={400}
        className="timeline-chart"
      />
    </div>
  );
};

export default FinishedProjects;
