import React, { useContext, useEffect, useState } from "react";
import "./styles.css";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Card from "../Card/Card";
import { GlobalContext } from "../../context/GlobalContext";

const priorityMapping = {
  0: "No Priority",
  1: "Low",
  2: "Medium",
  3: "High",
  4: "Urgent",
};

const Body = () => {
  const context = useContext(GlobalContext);
  const { FilterData = {} } = context;
  console.log(FilterData);
  const DynamicHeader = ({ id, count }) => {
    const { groupCriteria = "status", ordering = "" } = context;
    console.log('key',id);
    console.log('groupCriteria',groupCriteria);

    if (groupCriteria === "priority") {
      return (
        <>
          <CircleOutlinedIcon style={{ fontSize: "14px" }} />
          <span>{priorityMapping[id]}</span>
          <span>{count}</span>
        </>
      );
    } else {
      return (
        <>
          <CircleOutlinedIcon style={{ fontSize: "14px" }} />
          <span>{id}</span>
          <span>{count}</span>
        </>
      );
    }
  };
  return (
    <div className="body">
      {Object.keys(FilterData)?.map((key) => (
        <div className="grid-container">
          <div className="body-header">
            <div className="body-header-left">
              <DynamicHeader id={key} count={FilterData[key].length || 1} />
            </div>
            <div className="body-header-left">
              <AddOutlinedIcon style={{ fontSize: "15px" }} />
              <MoreHorizOutlinedIcon style={{ fontSize: "15px" }} />
            </div>
          </div>
          <div className="body-content">
            {FilterData[key]?.map((data) => (
              <Card data={data} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Body;
