import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid } from '@mui/material';
import { Bar, BarChart, Label, LabelList, Pie, PieChart, XAxis, YAxis } from 'recharts';
import { Marine } from 'types/models/mitsm/Marine';
import { MosBarChart } from 'types/models/mitsm/MosBarChart';
import { EasBarChart } from 'types/models/mitsm/EasBarChart';
import { OrganizationPieChart } from 'types/models/mitsm/OrganizationPieChart';
import { RankPieChart } from 'types/models/mitsm/RankPieChart';

function WorkflowDashboard() {
  const [mosBarChartData, setMosBarChartData] = useState(Array<MosBarChart>);
  const [easBarChartData, setEasBarChartData] = useState(Array<EasBarChart>);
  const [organizationPieChartData, setOrganizationPieChartData] = useState(Array<OrganizationPieChart>);
  const [rankPieChartData, setRankPieChartData] = useState(Array<RankPieChart>);

  const config = {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    },
  };

  const mos = ['0210', '0261', '0481', '0629', '0689', '2585', '2621', '2643', '2711', '9651'];
  const remains = [150, 225, 140, 200, 100, 250, 225, 160, 160, 300];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  useEffect(() => {
    axios.get('https://api.absc-labs.com/marines/', config).then((response) => {
      const mosCounts: MosBarChart[] = [];
      for (let i = 0; i < 10; i++) {
        const v: MosBarChart = { id: mos[i], count: 0, remain: remains[i] };
        mosCounts.push(v);
      }

      const easCounts: EasBarChart[] = [];
      for (let i = 0; i < 12; i++) {
        const v: EasBarChart = { id: i, count: 0, month: months[i] };
        easCounts.push(v);
      }

      const organizationCountMap: { [key: string]: OrganizationPieChart } = {};

      const rankCountMap: { [key: string]: RankPieChart } = {};

      response.data.forEach((m: Marine) => {
        const key = m.mos.slice(0, 1);
        const mosCount = mosCounts[+key];
        mosCount.count++;
        mosCount.remain--;
        mosCounts[+key] = mosCount;

        const easDate = Date.parse(m.eas);
        const easMonth = new Date(easDate).getMonth();
        const easCount = easCounts[easMonth];
        easCount.count++;
        easCounts[easMonth] = easCount;

        if (organizationCountMap[m.organization]) {
          const organizationCount: OrganizationPieChart = organizationCountMap[m.organization];
          organizationCount.count++;
          organizationCountMap[m.organization] = organizationCount;
        } else {
          const organization: OrganizationPieChart = {
            id: m.organization,
            count: 1,
          };
          organizationCountMap[m.organization] = organization;
        }

        if (rankCountMap[m.rank]) {
          const rankCount: RankPieChart = rankCountMap[m.rank];
          rankCount.count++;
          rankCountMap[m.rank] = rankCount;
        } else {
          const rank: RankPieChart = {
            id: m.rank,
            count: 1,
          };
          rankCountMap[m.rank] = rank;
        }
      });

      const sumEasCounts: EasBarChart[] = [];
      let sum = 0;
      const nowMonth = new Date().getMonth();
      for (let i = 0; i < 12; i++) {
        const v = easCounts[(i + nowMonth + 1) % 12];
        sum += v.count;
        const outlookSum = sum;
        sumEasCounts[i] = { id: v.id, count: outlookSum, month: v.month };
      }

      const organizationCounts: OrganizationPieChart[] = [];
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for (const [key, value] of Object.entries(organizationCountMap)) {
        organizationCounts.push(value);
      }

      const rankCounts: RankPieChart[] = [];
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for (const [key, value] of Object.entries(rankCountMap)) {
        rankCounts.push(value);
      }

      setMosBarChartData(mosCounts);
      setEasBarChartData(sumEasCounts);
      setOrganizationPieChartData(organizationCounts);
      setRankPieChartData(rankCounts);
    });
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h1>Reenlistment</h1>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12}>
            <h2>MOS Yearly Retention Count</h2>
          </Grid>
          <Grid item xs={12}>
            <BarChart width={800} height={300} data={mosBarChartData}>
              <XAxis dataKey="id" angle={315} dy={10} height={65}>
                <Label value="MOS" position="insideBottom" />
              </XAxis>
              <YAxis />
              <Bar dataKey="count" stackId="a" fill="#FF0000" />
              <Bar dataKey="remain" stackId="a" />
            </BarChart>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12}>
            <h2>12 Month Outlook</h2>
          </Grid>
          <Grid item xs={12}>
            <BarChart width={800} height={300} data={easBarChartData}>
              <XAxis dataKey="month" angle={315} dy={10} height={65}>
                <Label value="Expected EAS" position="insideBottom" />
              </XAxis>
              <YAxis />
              <Bar dataKey="count" fill="#FF0000" />
            </BarChart>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid item xs={6}>
            <h2>Reenlistment by Organization</h2>
          </Grid>
          <Grid item xs={6}>
            <PieChart width={400} height={400}>
              <Pie
                data={organizationPieChartData}
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#ff0000"
                dataKey="count"
                label
              >
                <LabelList dataKey="id" />
              </Pie>
            </PieChart>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid item xs={6}>
            <h2>Reenlistment by Rank</h2>
          </Grid>
          <Grid item xs={6}>
            <PieChart width={400} height={400}>
              <Pie data={rankPieChartData} cx="50%" cy="50%" outerRadius={120} fill="#ff0000" dataKey="count" label>
                <LabelList dataKey="id" />
              </Pie>
            </PieChart>
          </Grid>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </>
  );
}

export default WorkflowDashboard;
