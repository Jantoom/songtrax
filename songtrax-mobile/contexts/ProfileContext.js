import {createContext, useContext, useEffect, useReducer} from 'react';

export const PROFILE_ACTIONS = {
  init: 'init',
  update_name: 'update_name',
  update_photo: 'update_photo',
};

const ProfileContext = createContext(null);
const ProfileDispatchContext = createContext(null);

/**
 * Wraps components around profile context providers. This allows children to access the profile without
 * being explicitly passed on initialisation.
 *
 * @param {Object} params - An object containing parameters.
 * @param {React.ReactNode} children - Children to be given access to context.
 * @returns {React.ReactNode} Contexted children components.
 */
export function ProfileProvider({children}) {
  const [profile, dispatch] = useReducer(profileReducer, null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        dispatch({
          type: PROFILE_ACTIONS.init,
          profile: {
            name: '',
            photo: null,
          },
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <ProfileContext.Provider value={profile}>
      <ProfileDispatchContext.Provider value={dispatch}>
        {children}
      </ProfileDispatchContext.Provider>
    </ProfileContext.Provider>
  );
}

/**
 * Passes the profile context value without caller depending directly on React.
 *
 * @returns {any} Value of the profile context.
 */
export function useProfile() {
  return useContext(ProfileContext);
}

/**
 * Passes the profile dispatch without caller depending directly on React.
 *
 * @returns {any} The profile dispatch.
 */
export function useProfileDispatch() {
  return useContext(ProfileDispatchContext);
}

/**
 * Manipulates the state of the profile.
 *
 * @param {any} profile - Value of the profile before manipulation.
 * @param {Object} action - Contains which action to take and supplementary information.
 * @returns {Object} The newly manipulated profile.
 * @throws {Error} If the given action type is not known.
 */
function profileReducer(profile, action) {
  switch (action.type) {
    case PROFILE_ACTIONS.init: {
      return action.profile;
    }
    case PROFILE_ACTIONS.update_name: {
      return {...profile, name: action.name};
    }
    case PROFILE_ACTIONS.update_photo: {
      return {...profile, photo: action.photo};
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
