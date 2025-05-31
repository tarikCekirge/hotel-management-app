import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;


export default function SalesChart({ bookings, numDays }) {
  const { isDarkMode } = useDarkMode();

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date()
  })

  const data = allDates.map(date => {
    return {
      label: format(date, 'MMM dd'),
      totalSales: bookings.filter(booking => isSameDay(date, new Date(booking.created_at))).reduce((acc, cur) => acc + cur.totalPrice, 0),
      extrasSales: bookings.filter(booking => isSameDay(date, new Date(booking.created_at))).reduce((acc, cur) => acc + cur.extrasPrice, 0),

    }
  })

  const colors = isDarkMode
    ? {
      totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
      extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
      text: "#e5e7eb",
      background: "#18212f",
    }
    : {
      totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
      extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
      text: "#374151",
      background: "#fff",
    };



  return (
    <StyledSalesChart>
      <Heading as="h2" text={`Sales from ${format(allDates.at(0), 'MMM dd yyyy')} - ${format(allDates.at(-1), 'MMM dd yyyy')}`} />
      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <XAxis dataKey="label" tick={{ fill: colors.text }} tickLine={{ stroke: colors.text }} />
          <YAxis tick={{ fill: colors.text }} tickLine={{ stroke: colors.text }} unit="$" />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip contentStyle={{ backgroundColor: colors.background, border: "none" }} />
          <Area
            type="monotone"
            dataKey="totalSales"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            dot={false}
            unit='$'
            name="Total Sales"
          />
          <Area
            type="monotone"
            dataKey="extrasSales"
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            strokeWidth={2}
            dot={false}
            unit='$'
            name="Extra Sales"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}