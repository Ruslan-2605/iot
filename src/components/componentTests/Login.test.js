import React from "react";
import { create } from "react-test-renderer";
import { SignInReactHookForm } from "../Login/SignIn";

describe("Login", () => {
    it("callback shold be called", () => {
        const mockCallback = jest.fn();
        const component = create(<SignInReactHookForm signInThunkCreator={mockCallback} />);
        const instance = component.getInstance();
        instance.onSubmit()
        expect(mockCallback.mock.calls.length).toBe(1);
    });
})