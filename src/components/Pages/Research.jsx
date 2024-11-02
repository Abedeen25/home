import React from "react";
import { motion } from "framer-motion";
import ButtonC from "../Snippets/ButtonC";
import { IoLinkOutline } from "react-icons/io5";
import ModalC from "../Snippets/ModalC";
import SubTitle from "../Snippets/SubTitle";
import { LuBrainCircuit } from "react-icons/lu";

export default function Research({ researchDetails }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [modalInfo, setmodalInfo] = React.useState({
    title: "",
    subhead: "",
    details: "",
  });

  return (
    <div className="Research-page topic-sections" id="research">
      <div className="research">
        <SubTitle
          icon={<LuBrainCircuit className="Sub-icon" />}
          title="Research"
          subhead={researchDetails.subHead}
        />
        <div className="interests sub">
          <h3>Interests:</h3>
          {researchDetails.Interests.map((topic) => (
            <div className="topic">{topic}</div>
          ))}
        </div>
        <div className="published-works sub">
          <h3>Published Works:</h3>
          {researchDetails.Published.map((arti) => (
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="gradient-shadow article"
            >
              <img className="publogo" src={arti.PubLogo} alt="logo" />
              <div className="art-title">{arti.Title}</div>
              <div className="authors">
                <b>Authors:</b>{" "}
                {arti.Authors.map((auth) =>
                  auth === "Iftekharul Abedeen" ? (
                    <div>
                      <b>{auth}</b>
                    </div>
                  ) : (
                    <div>{auth}</div>
                  )
                )}
              </div>
              <div className="pub-info">
                <b>{arti.Type + ": "}</b>
                {arti.Publisher}
              </div>
              <div className="button-row">
                <ButtonC
                  buttonText={"Read"}
                  Type={"b-secondary"}
                  Link={arti.Link}
                  hLink={true}
                />
                <ButtonC
                  buttonText={"PDF"}
                  Type={"b-tertiary"}
                  Link={arti.PDF}
                  hLink={true}
                />
              </div>
            </motion.div>
          ))}
        </div>
        <div className="ongoing-works sub">
          <h3>Ongoing Works:</h3>
          {researchDetails.Ongoing.map((topic) => (
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="gradient-shadow article"
            >
              <div className="art-title">{topic.title}</div>
              {topic.Spervisor !== null ? (
                <div className="supervisor">
                  <b>Supervisor:</b>
                  <div
                    className="link"
                    onClick={() => window.open(topic.SupLink)}
                  >
                    {" " + topic.Spervisor + " "}
                    <IoLinkOutline></IoLinkOutline>
                  </div>
                </div>
              ) : (
                ""
              )}
              <div className="pub-info">
                <b>Status: </b>
                {topic.Status}
              </div>
              <ButtonC
                buttonText={"Read Abstract"}
                Type={"b-secondary"}
                hLink={false}
                action={({
                  t = topic.title,
                  s = "Abstract: ",
                  d = topic.abstract,
                }) => {
                  setIsOpen(!isOpen);
                  console.log(topic);
                  setmodalInfo({
                    head: t,
                    subhead: s,
                    details: d,
                  });
                }}
              />
              <ModalC isOpen={isOpen} setIsOpen={setIsOpen} info={modalInfo} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
