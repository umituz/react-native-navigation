/**
 * Mock for @react-navigation/native
 */

export const CommonActions = {
  reset: jest.fn((state) => ({ type: 'RESET', payload: state })),
  navigate: jest.fn((name, params) => ({ type: 'NAVIGATE', payload: { name, params } })),
  goBack: jest.fn(() => ({ type: 'GO_BACK' })),
};

export const StackActions = {
  replace: jest.fn((name, params) => ({ type: 'REPLACE', payload: { name, params } })),
  push: jest.fn((name, params) => ({ type: 'PUSH', payload: { name, params } })),
  pop: jest.fn((count) => ({ type: 'POP', payload: { count } })),
  popToTop: jest.fn(() => ({ type: 'POP_TO_TOP' })),
};

export const useNavigation = jest.fn(() => ({
  navigate: jest.fn(),
  goBack: jest.fn(),
  dispatch: jest.fn(),
  canGoBack: jest.fn(() => true),
  isFocused: jest.fn(() => true),
}));

export const useRoute = jest.fn(() => ({
  name: 'MockScreen',
  params: {},
  key: 'MockScreen-key',
}));

export const useFocusEffect = jest.fn();
export const useIsFocused = jest.fn(() => true);