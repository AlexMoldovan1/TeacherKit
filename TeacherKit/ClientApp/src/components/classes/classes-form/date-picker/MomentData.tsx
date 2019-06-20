import { Icon, Intent, IProps, Tag } from "@blueprintjs/core";
import { DateRange } from "@blueprintjs/datetime";
import classNames from "classnames";
import * as React from "react";
import Moment from "react-moment";
import "./date-picker.css";

const FORMAT = "DD-MM-YYYY";
const FORMAT_TIME = "dddd, LL LT";

export const MomentDate: React.SFC<{
  date: Date;
  format?: string;
  withTime?: boolean;
}> = ({ date, withTime = false, format = withTime ? FORMAT_TIME : FORMAT }) => {
  if (date) {
    return <Moment format={format} date={date} />;
  } else {
    return <Tag minimal={true}>no date</Tag>;
  }
};

export const MomentDateRange: React.SFC<
  { range: DateRange; format?: string; withTime?: boolean } & IProps
> = ({
  className,
  range: [start, end],
  withTime = false,
  format = withTime ? FORMAT_TIME : FORMAT
}) => (
  <div className={classNames("docs-date-range", className)}>
    <Moment format={format} date={start} />
    <Icon icon="arrow-right" className="arrow-right" />
    <Moment format={format} date={end} />
  </div>
);
