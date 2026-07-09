import { React, useState } from "react";
import { Link } from "react-router-dom";
import { PiPersonSimpleThrowBold } from "react-icons/pi";
import SubTitle from "../Snippets/SubTitle";
import { Gallery } from "react-grid-gallery";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export const Writeups = () => {
  const images = [
    {
      src: "https://i.postimg.cc/jdnHgvVh/6.webp",
      ori: "https://i.postimg.cc/qR23pNMt/6.jpg",
      width: 1280,
      height: 720,
      tags: [
        { value: "Redshift", title: "Redshift" },
        { value: "C4D", title: "Cinema 4D" },
      ],
      caption: "Glass Crab",
    },
    {
      src: "https://i.postimg.cc/Z5kr134z/7.webp",
      width: 1920,
      height: 1080,
      tags: [
        { value: "Cycles", title: "Cycles" },
        { value: "Blender", title: "Blender" },
      ],
      caption: "Spirited Away",
    },
    {
      src: "https://i.postimg.cc/44SvQq0d/9.webp",
      width: 1920,
      height: 1080,
      tags: [
        { value: "Cycles", title: "Cycles" },
        { value: "Blender", title: "Blender" },
      ],
      caption: "Spirited Away",
    },
    {
      src: "https://i.postimg.cc/4ym6TQYs/Nebula2.webp",
      width: 3440,
      height: 1440,
      tags: [
        { value: "Arnold", title: "Arnold" },
        { value: "Houdini", title: "Houdini" },
      ],
      caption: "Abstract",
    },
    {
      src: "https://i.postimg.cc/rpM5pkDh/Crab-tif.webp",
      ori: "https://i.postimg.cc/zv5RvqVx/Crab-tif.jpg",
      width: 2560,
      height: 1440,
      tags: [
        { value: "Redshift", title: "Redshift" },
        { value: "C4D", title: "Cinema 4D" },
      ],
      caption: "Crab Shader",
    },
    {
      src: "https://i.postimg.cc/bwQQ8JwD/Screenshot-2022-08-23-160609.webp",
      ori: "https://i.postimg.cc/mDPmjNwv/ALog.jpg",
      width: 2560,
      height: 1440,
      tags: [
        { value: "Octane", title: "Octane" },
        { value: "C4D", title: "Cinema 4D" },
      ],
      caption: "Logo",
    },
    {
      src: "https://i.postimg.cc/QMDcMW4G/light.webp",
      width: 1079,
      height: 1079,
      tags: [{ value: "Photoshop", title: "Photoshop" }],
      caption: "composition and Atmosphere",
    },
    {
      src: "https://i.postimg.cc/B6Z5m0s8/thumbnail.webp",
      width: 1920,
      height: 1080,
      tags: [
        { value: "Cycles", title: "Cycles" },
        { value: "Blender", title: "Blender" },
      ],
      caption: "Low Poly",
    },
    {
      src: "https://i.postimg.cc/zBdCMcXx/19a2967d-01cb-443f-b1dc-6b30894eab3f.webp",
      width: 1920,
      height: 1080,
      tags: [
        { value: "Cycles", title: "Cycles" },
        { value: "Blender", title: "Blender" },
      ],
      caption: "Low Poly",
    },
    {
      src: "https://i.postimg.cc/268vQNN0/Cool-water-and-ice.webp",
      width: 1920,
      height: 1080,
      tags: [
        { value: "Cycles", title: "Cycles" },
        { value: "Blender", title: "Blender" },
      ],
      caption: "Water Sim",
    },
    {
      src: "https://i.postimg.cc/LXCPvQH2/Crystal-5.webp",
      width: 1920,
      height: 1080,
      tags: [
        { value: "Cycles", title: "Cycles" },
        { value: "Blender", title: "Blender" },
      ],
      caption: "Refractive Shader",
    },
    {
      src: "https://i.postimg.cc/VkQC7Ccr/FATTAH-2.webp",
      width: 1920,
      height: 1080,
      tags: [
        { value: "Cycles", title: "Cycles" },
        { value: "Blender", title: "Blender" },
      ],
      caption: "Refractive Shader",
    },
    {
      src: "https://i.postimg.cc/C5Rq2C1D/iceblock.webp",
      width: 680,
      height: 384,
      tags: [
        { value: "Cycles", title: "Cycles" },
        { value: "Blender", title: "Blender" },
      ],
      caption: "Refractive Shader",
    },
    {
      src: "https://i.postimg.cc/66PRvPjh/lamp.webp",
      width: 1920,
      height: 1080,
      tags: [
        { value: "Cycles", title: "Cycles" },
        { value: "Blender", title: "Blender" },
      ],
      caption: "Lighting and composition",
    },
    {
      src: "https://i.postimg.cc/Gt6ynB8f/windcatcher.webp",
      width: 360,
      height: 212,
      tags: [
        { value: "Octane", title: "Octane" },
        { value: "C4D", title: "Cinema 4D" },
      ],
      caption: "Abstract Composition",
    },
    {
      src: "https://i.postimg.cc/hGy98kk4/CStour17.webp",
      width: 360,
      height: 360,
      tags: [{ value: "Photoshop", title: "Photoshop" }],
      caption: "Tour Logo",
    },
  ];

  const [index, setIndex] = useState(-1);

  return (
    <div className="topic-sections">
      <SubTitle
        icon={<PiPersonSimpleThrowBold className="Sub-icon" />}
        title="Misc."
        subhead={"A glimpse into my leisurely works"}
      />
      <div className="topicList">
        <div className="topic">
          <Link to="/blog" className="blog-link">
            <h3 className="chroma-hover">Writings &amp; Blog →</h3>
          </Link>
        </div>
        <div className="topic">
          <h3>3D Renders &amp; Compositions</h3>
        </div>
      </div>
      <div className="gal-render">
        <Gallery
          images={images}
          onClick={(i) => setIndex(i)}
          enableImageSelection={false}
        />
        <Lightbox
          open={index >= 0}
          index={index >= 0 ? index : 0}
          close={() => setIndex(-1)}
          slides={images.map((im) => ({
            src: im.ori || im.src,
            title: im.caption,
          }))}
        />
      </div>
    </div>
  );
};