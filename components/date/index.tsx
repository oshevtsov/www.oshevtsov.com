interface Props {
  dateTime?: string;
  display?: string;
}

const Date = ({ dateTime, display }: Props) => {
  return <time dateTime={dateTime}>{display}</time>
}

export default Date;
