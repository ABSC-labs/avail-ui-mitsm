import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid } from '@mui/material';
import { Bar, BarChart, Cell, Label, Pie, PieChart, XAxis, YAxis } from 'recharts';
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

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const units = ['H&S Co', 'A Co', 'B Co', 'C Co', 'W Co'];
  const ranks = ['LCpl', 'Cpl', 'Sgt', 'SSgt', 'GySgt', 'MSgt', '1Sgt', 'MGySgt', 'SgtMaj'];

  useEffect(() => {
    axios.get('https://api.absc-labs.com/marines/', config).then((response) => {
      const mosCountMap: { [key: string]: MosBarChart } = {};

      const easCounts: EasBarChart[] = [];
      for (let i = 0; i < 12; i++) {
        const v: EasBarChart = { id: i, count: 0, month: months[i] };
        easCounts.push(v);
      }

      const organizationCountMap: { [key: string]: OrganizationPieChart } = {};

      const rankCountMap: { [key: string]: RankPieChart } = {};

      response.data.forEach((m: Marine) => {
        const key = m.mos;
        const mosCount = mosCountMap[+key];
        if (mosCount) {
          mosCount.id = key;
          mosCount.count++;
          mosCount.remain--;
          mosCountMap[+key] = mosCount;
        } else {
          const mosCount: MosBarChart = {
            id: key,
            count: 1,
            remain: Math.floor(Math.random() * (250 - 100 + 1) + 100),
          };
          mosCountMap[+key] = mosCount;
        }

        const easDate = new Date(Date.parse(m.eas));
        const now = new Date();
        now.setMonth(now.getMonth() + 1);
        const oneYear = new Date();
        oneYear.setMonth(oneYear.getMonth() + 1);
        oneYear.setFullYear(oneYear.getFullYear() + 1);
        if (easDate > now && easDate <= oneYear) {
          const easMonth = easDate.getMonth();
          const easCount = easCounts[easMonth];
          easCount.count++;
          easCounts[easMonth] = easCount;
        }

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

      const mosCounts: MosBarChart[] = [];
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for (const [key, value] of Object.entries(mosCountMap)) {
        mosCounts.push(value);
      }

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
      units.forEach((v: string) => {
        if (organizationCountMap[v].count > 0) {
          organizationCounts.push(organizationCountMap[v]);
        }
      });

      const rankCounts: RankPieChart[] = [];
      ranks.forEach((v: string) => {
        if (rankCountMap[v].count > 0) {
          rankCounts.push(rankCountMap[v]);
        }
      });

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
            <h2>Horizon Retention Progress by MOS</h2>
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
                <Label value="Current EAS" position="insideBottom" />
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
            <PieChart width={500} height={400}>
              <Pie
                data={organizationPieChartData}
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#ff0000"
                dataKey="count"
                label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
                  const RADIAN = Math.PI / 180;
                  // eslint-disable-next-line
                  const radius = innerRadius + (outerRadius - innerRadius) * 1.2;
                  // eslint-disable-next-line
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  // eslint-disable-next-line
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);

                  return (
                    <text x={x} y={y} fill="#000000" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="hanging">
                      {organizationPieChartData[index].id} ({`${(percent * 100).toFixed(1)}%`})
                    </text>
                  );
                }}
              />
            </PieChart>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid item xs={6}>
            <h2>Reenlistment by Rank</h2>
          </Grid>
          <Grid item xs={6}>
            <PieChart width={470} height={400} margin={{ right: 20 }}>
              <Pie
                data={rankPieChartData}
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#ff0000"
                dataKey="count"
                label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
                  let x = 0;
                  let y = 0;
                  if (rankPieChartData[index].id == 'SgtMaj') {
                    const RADIAN = Math.PI / 180;
                    const radius = innerRadius + (outerRadius - innerRadius) * 1.2;
                    x = cx + radius * Math.cos(-midAngle * RADIAN);
                    y = cy + radius * Math.sin(-midAngle * RADIAN) - 10;
                  } else if (rankPieChartData[index].id == 'MGySgt') {
                    const RADIAN = Math.PI / 180;
                    const radius = innerRadius + (outerRadius - innerRadius) * 1.2;
                    x = cx + radius * Math.cos(-midAngle * RADIAN);
                    y = cy + radius * Math.sin(-midAngle * RADIAN);
                  } else if (rankPieChartData[index].id == '1Sgt') {
                    const RADIAN = Math.PI / 180;
                    const radius = innerRadius + (outerRadius - innerRadius) * 1.2;
                    x = cx + radius * Math.cos(-midAngle * RADIAN);
                    y = cy + radius * Math.sin(-midAngle * RADIAN) + 5;
                  } else {
                    const RADIAN = Math.PI / 180;
                    const radius = innerRadius + (outerRadius - innerRadius) * 1.2;
                    x = cx + radius * Math.cos(-midAngle * RADIAN);
                    y = cy + radius * Math.sin(-midAngle * RADIAN);
                  }

                  return (
                    <text x={x} y={y} fill="#000000" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="hanging">
                      {rankPieChartData[index].id} ({`${(percent * 100).toFixed(1)}%`})
                    </text>
                  );
                }}
              >
                {rankPieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} />
                ))}
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
