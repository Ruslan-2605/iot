import { authReducer, setAuthUserData } from '../redux/reducers/authReducer';

const state = {
    username: null,
    token: null,
    userId: null,
    isAuth: false,
};

it('authorization data should be added', () => {
    const response = { username: "Ruslan", token: "token", userId: 1 };
    const action = setAuthUserData({ ...response, isAuth: true });
    const newState = authReducer(state, action)
    expect(newState.username).toBe("Ruslan");
    expect(newState.token).toBe("token");
    expect(newState.isAuth).toBe(true);
});
