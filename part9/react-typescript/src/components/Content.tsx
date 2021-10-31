import React from "react";
import { CoursePart } from "../App";
import Part from "./Part";

interface Props {
  courseParts: CoursePart[];
}

const Content = (props: Props): JSX.Element => {
  return (
    <div>
      {props.courseParts.map((course: CoursePart, index: number) => (
        <div key={index}>
          <Part course={course} />
        </div>
      ))}
    </div>
  );
};
export default Content;
