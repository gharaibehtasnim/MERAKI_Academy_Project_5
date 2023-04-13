import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "./syle.css";

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //dispatch
  const dispatch = useDispatch();

  //redux states
  const { token, userId, isLoggedIn, friends, isFriend } = useSelector(
    (state) => {
      //return object contains the redux states
      return {
        userId: state.auth.userId,
        token: state.auth.token,
        isLoggedIn: state.auth.isLoggedIn,
        friends: state.friends.friends,
        isFriend: state.friends.isFriend,

      };
    }
  );

  const ReceivedRequests = () => {
    //*ME => receiver_id

    axios
      .get(`http://localhost:5000/friends/received/requests`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        // console.log(response.data);

        //response.data.result => array of received requests
        // setReceivedReq(response.data.result);
        // dispatch()
      })
      .catch(function (error) {
        throw error;
      });
  };

  const SentRequests = () => {
    //*ME => sender_id

    axios
      .get(`http://localhost:5000/friends/sent/requests`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        // console.log(response.data);

        //response.data.result => array of sent requests
        // setSentReq(response.data.result);
      })
      .catch(function (error) {
        throw error;
      });
  };

  useEffect(() => {
    SentRequests();
    ReceivedRequests();
  }, []);

//   console.log("ooooooooo", sentReq);

  //cancel friend request
  const cancelFriendReqFun = (receiver_id) => {
    axios
      .delete(`http://localhost:5000/friends/cancel/${receiver_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        console.log(response.data.result);

        // const newSentArr = sentReq.filter((element, i) => {
        //   return element.receiver_id !== receiver_id;
        // });
        // setSentReq(newSentArr);
      })
      .catch(function (error) {
        throw error;
      });
  };

  //decline the friend request
  // when the receiver delete or decline the request
  const declineFriendReqFun = () => {
    axios
      .delete(`http://localhost:5000/friends/decline/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        // console.log(response.data.result);
      })
      .catch(function (error) {
        throw error;
      });
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Friend Requests
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        style={{ width: "500rem" }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Tabs
          defaultActiveKey="Add Requests"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="Add Requests" title="Add Requests">
            {/* <div className="friend-list-body">
              {ReceivedReq &&
                ReceivedReq.map((element) => {
                  return (
                    <div key={element.request_id}>
                      <div className="friend-list">
                        <div className="friend-img-name">
                          <img
                            className="friend-img"
                            src={
                              element.avatar ||
                              "https://png.pngtree.com/png-clipart/20210613/original/pngtree-gray-silhouette-avatar-png-image_6404679.jpg"
                            }
                          />

                          <p>{element.firstname + " " + element.lastname}</p>
                        </div>
                        <div className="buttons">
                          <Button
                            variant="contained"
                            size="small"
                            color="success"
                          >
                            Accept
                          </Button>
                          <Button
                            variant="contained"
                            size="small"
                            color="error"
                          >
                            Decline
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div> */}
          </Tab>
          <Tab eventKey="Sent Requests" title="Sent Requests">
            {/* <div className="friend-list-body">
              {sentReq &&
                sentReq.map((element) => {
                  return (
                    <div key={element.request_id}>
                      <div className="friend-list">
                        <div className="friend-img-name">
                          <img
                            className="friend-img"
                            src={
                              element.avatar ||
                              "https://png.pngtree.com/png-clipart/20210613/original/pngtree-gray-silhouette-avatar-png-image_6404679.jpg"
                            }
                          />

                          <p>{element.firstname + " " + element.lastname}</p>
                        </div>
                        <div className="buttons">
                          <Button
                            variant="contained"
                            size="small"
                            color="error"
                            onClick={() => {
                              cancelFriendReqFun(element.receiver_id);
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div> */}
          </Tab>
        </Tabs>

        {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem> */}
      </Menu>
    </div>
  );
}