import React from "react";
import { CoursePart } from "../App";

interface Props {
  course: CoursePart;
}

const Part = (props: Props) => {
  switch (props.course.type) {
    case "normal":
      return (
        <div>
          <p>
            <strong>
              {" "}
              {props.course.name} {props.course.exerciseCount}
            </strong>
          </p>
          <p>
            {" "}
            <i> {props.course.description}</i>{" "}
          </p>
        </div>
      );
    case "submission":
      return (
        <div>
          <p>
            <strong>
              {" "}
              {props.course.name} {props.course.exerciseCount}
            </strong>{" "}
          </p>
          <p>
            <i> {props.course.description} </i>{" "}
          </p>
          <p> {props.course.exerciseSubmissionLink} </p>
        </div>
      );
    case "special": {
      return (
        <div>
          <p>
            <strong>
              {" "}
              {props.course.name} {props.course.exerciseCount}
            </strong>{" "}
          </p>
          <p>
            <i> {props.course.description} </i>{" "}
          </p>
          <p>
            {" "}
            required skills:{" "}
            {props.course.requirements.map((skills, index) => (
              <span key={index}>{`${skills} `}</span>
            ))}
          </p>
        </div>
      );
    }
    case "groupProject":
      return (
        <div>
          <p>
            <strong>
              {" "}
              {props.course.name} {props.course.exerciseCount}{" "}
            </strong>{" "}
          </p>
          <p>project exercises {props.course.groupProjectCount}</p>
        </div>
      );
  }
};

export default Part;
