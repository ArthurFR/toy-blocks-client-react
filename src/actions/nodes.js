import fetch from "cross-fetch";
import * as types from "../constants/actionTypes";

const checkNodeStatusStart = (node) => {
  return {
    type: types.CHECK_NODE_STATUS_START,
    node,
  };
};

const checkNodeStatusSuccess = (node, res) => {
  return {
    type: types.CHECK_NODE_STATUS_SUCCESS,
    node,
    res,
  };
};

const checkNodeStatusFailure = (node) => {
  return {
    type: types.CHECK_NODE_STATUS_FAILURE,
    node,
  };
};

export function checkNodeStatus(node) {
  return async (dispatch) => {
    try {
      dispatch(checkNodeStatusStart(node));
      const res = await fetch(`${node.url}/api/v1/status`);

      if (res.status >= 400) {
        dispatch(checkNodeStatusFailure(node));
        return;
      }

      const json = await res.json();

      dispatch(checkNodeStatusSuccess(node, json));
    } catch (err) {
      dispatch(checkNodeStatusFailure(node));
    }
  };
}

export function checkNodeStatuses(list) {
  return (dispatch) => {
    list.forEach((node) => {
      dispatch(checkNodeStatus(node));
    });
  };
}

const getBlocksDataStart = (node) => {
  return {
    type: types.GET_BLOCKS_DATA_START,
    node,
  };
};

const getBlocksDataSuccess = (node, res) => {
  return {
    type: types.GET_BLOCKS_DATA_SUCCESS,
    node,
    res,
  };
};

const getBlocksDataFailure = (node) => {
  return {
    type: types.GET_BLOCKS_DATA_FAILURE,
    node,
  };
};

export function getBlocksData(node) {
  return async (dispatch) => {
    try {
      dispatch(getBlocksDataStart(node));
      const res = await fetch(`${node.url}/api/v1/blocks`);

      if (res.status >= 400) {
        dispatch(getBlocksDataFailure(node));
        return;
      }

      const json = await res.json();

      dispatch(getBlocksDataSuccess(node, json));
    } catch (err) {
      dispatch(getBlocksDataFailure(node));
    }
  };
}
