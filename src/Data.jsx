import React from 'react';

const Data = ({ targetVelocity, rotation, simFinished, simStarted, rocketVelocity, setRocketVelocity, targetHeading }) => {

    const handleBox1Changed = (e) => {
      if (!simStarted) {
        document.velocityForm.velocity3.checked = false;
        setRocketVelocity(e.target.value);
      } else {
        e.preventDefault();
      }
    }
    
    const handleBox2Changed = (e) => {
      if (!simStarted) {
        document.velocityForm.velocity1.checked = false; 
        setRocketVelocity(e.target.value);
      } else {
        e.preventDefault();
      }
    }

    return (
      <>
        <div className={ simFinished ? "data-container-center" : "data-container"}>
          <table>
            <thead>
              <tr>
                <td>Target Velocity V<sub>T</sub></td>
                <td>Pursuer Velocity V<sub>P</sub></td>
                <td>Lead Angle &Theta;<sub>L</sub></td>
                <td>Target Heading A </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{targetVelocity} m/s</td>
                <td>
                  {
                    simFinished ? `${rocketVelocity} m/s` :
                      <>
                        <form name='velocityForm'>
                          <div>
                            <label htmlFor='velocity1'><span>{`${targetVelocity}`}</span> <span>m/s</span> ➖ <span>V<sub>T</sub></span></label>
                            <input id="velocity1" type="checkbox" value={targetVelocity} onClick={handleBox1Changed} defaultChecked />
                          </div>
                          <div>
                            <label htmlFor='velocity3'><span>{`${targetVelocity * 3}`}</span> <span>m/s</span> ➖ <span>3V<sub>T</sub></span></label>
                            <input id="velocity3" type="checkbox" value={targetVelocity * 3} onChange={handleBox2Changed} />
                          </div>
                        </form>
                      </>
                  }
                </td>
                <td>{ (90 - rotation).toFixed(2) } deg</td>
                <td><span style={ simFinished ? { display: "block" } : { display: "none" }}>{ Number(rocketVelocity) === targetVelocity * 3 ? targetHeading.toFixed(2) : (90 - rotation).toFixed(2) } deg</span></td>
              </tr>
            </tbody>
          </table>
          <button className='restart-btn' onClick={ () => window.location.reload() } style={{ display: simFinished ? "block" : "none" }}>Restart Simulation</button>
        </div>
      </>
    );
  }
  

export default Data;