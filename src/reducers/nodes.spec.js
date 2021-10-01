import * as ActionTypes from '../constants/actionTypes';
import reducer from './nodes';
import initialState from './initialState';


describe('Reducers::Nodes', () => {
  const getInitialState = () => {
    return initialState().nodes;
  };

  const nodeA = {
    url: 'http://localhost:3002',
    online: false,
    name: null,
    blocks: {
      list: [],
      loading: false,
      error: false,
    }
  };

  const nodeB = {
    url: 'http://localhost:3003',
    online: false,
    name: null,
    blocks: {
      list: [],
      loading: false,
      error: false,
    }
  };

  it('should set initial state by default', () => {
    const action = { type: 'unknown' };
    const expected = getInitialState();

    expect(reducer(undefined, action)).toEqual(expected);
  });

  it('should handle CHECK_NODE_STATUS_START', () => {
    const appState = {
      list: [nodeA, nodeB]
    };
    const action = { type: ActionTypes.CHECK_NODE_STATUS_START, node: nodeA };
    const expected = {
      list: [
        {
          ...nodeA,
          loading: true
        },
        nodeB
      ]
    };

    expect(reducer(appState, action)).toEqual(expected);
  });

  it('should handle CHECK_NODE_STATUS_SUCCESS', () => {
    const appState = {
      list: [nodeA, nodeB]
    };
    const action = { type: ActionTypes.CHECK_NODE_STATUS_SUCCESS, node: nodeA, res: {node_name: 'alpha'} };
    const expected = {
      list: [
        {
          ...nodeA,
          online: true,
          name: 'alpha',
          loading: false
        },
        nodeB
      ]
    };

    expect(reducer(appState, action)).toEqual(expected);
  });

  it('should handle CHECK_NODE_STATUS_FAILURE', () => {
    const appState = {
      list: [
        {
          ...nodeA,
          online: true,
          name: 'alpha',
          loading: false
        },
        nodeB
      ]
    };
    const action = { type: ActionTypes.CHECK_NODE_STATUS_FAILURE, node: nodeA };
    const expected = {
      list: [
        {
          ...nodeA,
          online: false,
          name: 'alpha',
          loading: false
        },
        nodeB
      ]
    };

    expect(reducer(appState, action)).toEqual(expected);
  });

  it('should handle GET_BLOCKS_DATA_START', () => {
    const appState = {
      list: [nodeA, nodeB]
    };
    const action = { type: ActionTypes.GET_BLOCKS_DATA_START, node: nodeA };
    const expected = {
      list: [
        {
          ...nodeA,
          blocks: {
            ...nodeA.blocks,
            loading: true,
            error: false,
          }
        },
        nodeB
      ]
    };

    expect(reducer(appState, action)).toEqual(expected);
  });

  it('should handle GET_BLOCKS_DATA_SUCCESS', () => {
    const res = { data: [{attributes: {index: 1, data: 'block_data'}}] };
    const appState = {
      list: [nodeA, nodeB]
    };
    const action = { type: ActionTypes.GET_BLOCKS_DATA_SUCCESS, node: nodeA, res };
    const expected = {
      list: [
        {
          ...nodeA,
          blocks: {
            list: res.data,
            loading: false,
            error: false,
          }
        },
        nodeB
      ]
    };

    expect(reducer(appState, action)).toEqual(expected);
  });

  it('should handle GET_BLOCKS_DATA_FAILURE', () => {
    const appState = {
      list: [
        {
          ...nodeA,
          blocks: {
            list: [{attributes: {index: 1, data: 'block_data'}}],
            loading: false,
            error: false,
          }
        }
        ,
        nodeB
      ]
    };
    const action = { type: ActionTypes.GET_BLOCKS_DATA_FAILURE, node: nodeA };
    const expected = {
      list: [
        {
          ...nodeA,
          blocks: {
            list: [],
            loading: false,
            error: true,
          }
        },
        nodeB
      ]
    };

    expect(reducer(appState, action)).toEqual(expected);
  });
});
