import React from "react";

function TallyPopup(props: any): React.JSX.Element {
  function openPopup(): void {
    // @ts-expect-error Expect TallyPopup form error
    window.TallyConfig = {
      formId: "mJ9WNz",
      hideTitle: true,
      popup: {
        width: 300,
        hideTitle: true,
        open: {
          trigger: "scroll",
          scrollPercent: 80,
        },
        autoClose: 5000,
      },
    };
    const formId = "mJ9WNz";
    // @ts-expect-error Expect TallyPopup `openPopup` error
    Tally.openPopup(formId, TallyConfig);
  }

  return (
    <button className="button-default tally-popup-prompt" onClick={openPopup}>
      <i className="fa-regular fa-comment"></i>
    </button>
  );
}
export default TallyPopup;
