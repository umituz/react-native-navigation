/**
 * Navigation Actions Tests
 */

import { NavigationActions } from '../infrastructure/utils/NavigationActions';
import { NavigationRefManager } from '../infrastructure/utils/NavigationRefManager';
import { NavigationConfigManager } from '../infrastructure/utils/NavigationConfigManager';

// Mock navigation ref
const mockNavigationRef = {
  navigate: jest.fn(),
  push: jest.fn(),
  goBack: jest.fn(() => true),
  canGoBack: jest.fn(() => true),
  dispatch: jest.fn(),
  getCurrentRoute: jest.fn(() => ({ name: 'Home' })),
  getParent: jest.fn(() => null),
  isReady: jest.fn(() => true),
};

describe('NavigationActions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    NavigationRefManager.cleanup();
    NavigationConfigManager.reset();
    NavigationRefManager.setNavigationRef(mockNavigationRef as any);
  });

  describe('navigate', () => {
    it('should navigate successfully with valid input', () => {
      const result = NavigationActions.navigate('Home', { test: 'param' });
      
      expect(result).toBe(true);
      expect(mockNavigationRef.navigate).toHaveBeenCalledWith('Home', { test: 'param' });
    });

    it('should return false when navigation ref is null', () => {
      NavigationRefManager.setNavigationRef(null);
      const result = NavigationActions.navigate('Home');
      
      expect(result).toBe(false);
      expect(mockNavigationRef.navigate).not.toHaveBeenCalled();
    });

    it('should return false with invalid route name', () => {
      const result = NavigationActions.navigate('invalid route');
      
      expect(result).toBe(false);
      expect(mockNavigationRef.navigate).not.toHaveBeenCalled();
    });
  });

  describe('navigateToParent', () => {
    it('should navigate to parent when parent exists', () => {
      const mockParent = {
        navigate: jest.fn(),
      };
      mockNavigationRef.getParent.mockReturnValue(mockParent);

      const result = NavigationActions.navigateToParent('ParentScreen', { param: 'value' });
      
      expect(result).toBe(true);
      expect(mockParent.navigate).toHaveBeenCalledWith('ParentScreen', { param: 'value' });
    });

    it('should navigate to current when parent does not exist', () => {
      mockNavigationRef.getParent.mockReturnValue(null);

      const result = NavigationActions.navigateToParent('CurrentScreen');
      
      expect(result).toBe(true);
      expect(mockNavigationRef.navigate).toHaveBeenCalledWith('CurrentScreen', undefined);
    });
  });

  describe('navigateToStack', () => {
    it('should navigate to stack with screen and params', () => {
      const result = NavigationActions.navigateToStack('AuthStack', 'LoginScreen', { redirect: '/home' });
      
      expect(result).toBe(true);
      expect(mockNavigationRef.navigate).toHaveBeenCalledWith('AuthStack', {
        screen: 'LoginScreen',
        params: { redirect: '/home' },
      });
    });

    it('should return false with invalid stack name', () => {
      const result = NavigationActions.navigateToStack('invalid stack', 'Screen');
      
      expect(result).toBe(false);
      expect(mockNavigationRef.navigate).not.toHaveBeenCalled();
    });
  });

  describe('push', () => {
    it('should push to stack successfully', () => {
      const result = NavigationActions.push('DetailScreen', { id: 123 });
      
      expect(result).toBe(true);
      expect(mockNavigationRef.push).toHaveBeenCalledWith('DetailScreen', { id: 123 });
    });
  });

  describe('goBack', () => {
    it('should go back when possible', () => {
      mockNavigationRef.canGoBack.mockReturnValue(true);
      
      const result = NavigationActions.goBack();
      
      expect(result).toBe(true);
      expect(mockNavigationRef.goBack).toHaveBeenCalled();
    });

    it('should return false when cannot go back', () => {
      mockNavigationRef.canGoBack.mockReturnValue(false);
      
      const result = NavigationActions.goBack();
      
      expect(result).toBe(false);
      expect(mockNavigationRef.goBack).not.toHaveBeenCalled();
    });
  });

  describe('reset', () => {
    it('should reset navigation stack', () => {
      const result = NavigationActions.reset('HomeScreen', { reset: true });
      
      expect(result).toBe(true);
      expect(mockNavigationRef.dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'RESET',
          payload: {
            index: 0,
            routes: [{ key: 'HomeScreen', name: 'HomeScreen', params: { reset: true } }],
          },
        })
      );
    });
  });

  describe('replace', () => {
    it('should replace current screen', () => {
      const result = NavigationActions.replace('NewScreen', { replace: true });
      
      expect(result).toBe(true);
      expect(mockNavigationRef.dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'REPLACE',
          payload: {
            name: 'NewScreen',
            params: { replace: true },
          },
        })
      );
    });
  });
});