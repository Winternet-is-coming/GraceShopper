/* global describe beforeEach it */

import { expect } from "chai";
import "jsdom-global/register";
import configureStore from "redux-mock-store";
import React from "react";
import enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SingleProduct from "./SingleProduct";

import thunkMiddleware from "redux-thunk";
import singleProductReducer from "../store/singleProduct";

const adapter = new Adapter();
enzyme.configure({ adapter });

const mockProducts = [
  {
    id: 1,
    name: "Matcha Pocky",
    price: 12.99,
    quantity: 99,
    description: "A box of delicious Pocky",
    imageUrl: "https://images.heb.com/is/image/HEBGrocery/001779488",
  },
  {
    id: 2,
    name: "Taiyaki",
    price: 7.99,
    quantity: 85,
    description: "Matcha Ice Cream and Red bean paste what more do you want",
    imageUrl:
      "https://cdn.vox-cdn.com/thumbor/J8AtwCpBgNuGtHH3uvn3J1KI8yI=/0x120:960x840/1400x1400/filters:focal(0x120:960x840):format(jpeg)/cdn.vox-cdn.com/uploads/chorus_image/image/51047099/14333641_175488296188873_4191830636852674148_n.0.jpg",
  },
  {
    id: 3,
    name: "Sakura Pocky",
    price: 8.99,
    quantity: 90,
    description: "A box of delicious Sakura Pocky",
    imageUrl:
      "https://scstore.com.my/wp-content/uploads/2020/07/Untitled-design-20.jpg",
  },
];

const reducer = { singleProductReducer };

const mockStore = configureStore(thunkMiddleware());

const initialState = { product: {} };
const store = mockStore(initialState);

describe.only("Single Product view", () => {
  // let product;

  // beforeEach(() => {
  //   product = shallow(<SingleProduct product={mockProducts[0]} />);
  // });

  let wrapper;
  beforeEach(() => {
    wrapper = mount(<SingleProduct store={store} />);
  });

  it("should render Single Product component", () => {
    expect(wrapper.find("SingleProduct").exists()).to.be.equal(true);
  });

  it("renders the product name in a h3", () => {
    // let product = shallow(<SingleProduct product={mockProducts[0]} />);
    // expect(product.find("h3").text()).to.be.equal("Matcha Pocky");
    // expect(product.props().product.name).to.equal("Matcha Pocky");
  });
});
