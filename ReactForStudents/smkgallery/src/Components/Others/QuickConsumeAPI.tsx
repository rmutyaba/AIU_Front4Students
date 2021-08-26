//QuickConsumeAPI

import "../../css/RotatingImage.css";
import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Image from "react-bootstrap/Image";
import Container from 'react-bootstrap/Container'

//updating the file to work with redux store
import { useSelector, useDispatch } from "react-redux";

import {
  gettingSingleArtObjectAction,
  gotSingleArtObjectAction,
  AppState,
} from "../../store";
import Button from "react-bootstrap/esm/Button";

import { SingleArtwork } from "../../Interfaces/SingleArtwork";

const stringThings = require("../../OtherStuff/StringConstants.json");

const QuickConsumeAPI = () => {
  const dispatch = useDispatch();

  const singleartobject = useSelector(
    (state: AppState) => state.artobject.artobjectviewing
  );

  const singleartobjectLoading = useSelector(
    (state: AppState) => state.artobject.loading
  );

      //function to call the function
    //which will in turn call the web api
    const GetTheArtObject = async () => {
        dispatch(gettingSingleArtObjectAction());
        const tempSingleArtObject = await getSingleArtObject();
        dispatch(gotSingleArtObjectAction(tempSingleArtObject));
      };

  React.useEffect(() => {
    console.log("Landing Page SMK Rendered");



    //now, call the function and load the image data.
    GetTheArtObject();

    //adding the below line about eslint-disable because eslint keeps expecting dependency for dispatch
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <Container>
          <Button onClick= {GetTheArtObject}>Refresh Image</Button>
      {singleartobjectLoading ? (
          <Container>
            {/* <p>Loading...</p> */}
            <SkeletonTheme color="#12e451" highlightColor="#df1462">
              <p>
                <Skeleton count={stringThings.NumberOfLoadingLines} />
              </p>
            </SkeletonTheme>
            ;
          </Container>
        ) : (
          <Container>
            {/* <p>Image Information Loaded.</p> */}
            <p>Image ID - {singleartobject?.items[0].id}</p>
            <Image
              src={singleartobject?.items[0].image_thumbnail}
              alt={singleartobject?.items[0].titles?.toString()}
              height="500"
              fluid
            ></Image>
          </Container>
        )}
      </Container>
    </div>
  );
};

export default QuickConsumeAPI;

//function that will call and return the response
const getSingleArtObject = async (): Promise<SingleArtwork | null> => {
  //return object
  let responseObject: SingleArtwork;
  const finalURL =
    "https://api.smk.dk/api/v1/art/?object_number=KKS2007-182&lang=en";
  const response = await fetch(finalURL);
  responseObject = await response.json();
  return responseObject.items.length === 0 ? null : responseObject;
};

