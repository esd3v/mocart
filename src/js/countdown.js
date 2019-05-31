export const countdown = () => {
  const timer = [0, 1, 15, 45];
  const totalMsec = ((((((timer[0] * 24) + timer[1]) * 60) + timer[2]) * 60) + timer[3] ) * 1000;
  const endDate = new Date(Date.now() + totalMsec);
  const hoursEl = document.getElementsByClassName('countdown__digit--hours')[0];
  const minutesEl = document.getElementsByClassName('countdown__digit--minutes')[0];
  const secondsEl = document.getElementsByClassName('countdown__digit--seconds')[0];

  const setText = (el, val) => {
    const joined = `0${val}`;
    el.innerHTML = (val.length === 1) ? joined : val;
  };

  setText(hoursEl, timer[1]);
  setText(minutesEl, timer[2]);
  setText(secondsEl, timer[3]);

  const decrease = () => {
    const totalRem = Date.parse(endDate) - Date.parse(new Date());
    // const daysRem = Math.floor(totalRem / (1000 * 60 * 60 * 24));
    const hoursRem = Math.floor((totalRem / (1000 * 60 * 60)) % 24);
    const minutesRem = Math.floor((totalRem / 1000 / 60) % 60);
    const secondsRem = Math.floor((totalRem / 1000) % 60);

    if (hoursRem !== timer[1]) {
      timer[1] = hoursRem;
      setText(hoursEl, hoursRem);
    }

    if (minutesRem !== timer[2]) {
      timer[2] = minutesRem;
      setText(minutesEl, minutesRem);
    }

    if (totalRem > 0) {
      setText(secondsEl, secondsRem);
      setTimeout(decrease, 1000);
    } else {
      setText(secondsEl, secondsRem);
    }
  };

  decrease();
};
