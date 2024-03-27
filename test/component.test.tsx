import React from "react";
import { create } from "react-test-renderer";
import TestScreen from "../src/components/test/TestScreen";


const tree = create(<TestScreen/>);

test('snapshot', () => {
    expect(tree).toMatchSnapshot();
});