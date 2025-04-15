import React, { useMemo } from "react";
import ReactApexChart from "react-apexcharts";

const FinishedProjects = ({ projects }) => {
  const processedData = useMemo(() => {
    if (!projects || !Array.isArray(projects)) {
      return [];
    }

    return projects.map(project => {
      // Extract meaningful project name from path
      const pathParts = project.path.split('/').filter(Boolean);
      const projectName = pathParts[pathParts.length - 1].replace(/-/g, ' ');

      // Format date
      const date = new Date(project.createdAt);
      const formattedDate = date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });

      console.log(date.getDate());
      return {
        x: projectName,
        y: [
          date.getTime(), // Start
          date.getTime()  // End (same as start since it's a point in time)
        ],
        grade: project.grade,
        fillColor: '00E396',
      };
    });
  }, [projects]);

  // const getColorByGrade = (grade) => {
  //   if (grade >= 9) return '#00E396'; // High grade - green
  //   if (grade >= 7) return '#FEB019'; // Medium grade - yellow/orange
  //   return '#FF4560'; // Low grade - red
  // };

  const chartOptions = {
    chart: {
      type: 'timeline',
      height: 450,
      toolbar: {
        show: true
      }
    },
    plotOptions: {
      bar: {
        horizontal: true,
        distributed: true,
        dataLabels: {
          hideOverflowingLabels: false
        }
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function(val, opts) {
        const project = projects[opts.dataPointIndex];
        return `${opts.w.globals.labels[opts.dataPointIndex]} (Grade: ${project.grade})`;
      },
      style: {
        fontSize: '12px',
        fontWeight: 'normal'
      }
    },
    xaxis: {
      type: 'datetime',
      position: 'top',
      labels: {
        format: 'MMM dd'
      }
    },
    yaxis: {
      labels: {
        style: {
          fontSize: '12px'
        }
      }
    },
    tooltip: {
      custom: function({ seriesIndex, dataPointIndex, w }) {
        const project = projects[dataPointIndex];
        const date = new Date(project.updatedAt).toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        
        return `
          <div class="custom-tooltip">
            <b>${w.globals.labels[dataPointIndex]}</b><br/>
            Completed: ${date}<br/>
            Grade: ${project.grade}<br/>
            Path: ${project.path}
          </div>
        `;
      }
    },
    grid: {
      xaxis: {
        lines: {
          show: true
        }
      }
    },
    colors: ['#00B1F2'], // Default color, will be overridden by fillColor
    title: {
      text: 'Recently Completed Projects',
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

  if (!projects || projects.length === 0) {
    return <div>No completed projects to display</div>;
  }

  return (
    <div>
      <ReactApexChart
        options={chartOptions}
        series={series}
        type="rangeBar"
        height={450}
      />
    </div>
  );
};

export default FinishedProjects;
