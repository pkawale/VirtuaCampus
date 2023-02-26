import {useLocation} from 'react-router-dom';
import {useState} from 'react';

function Profile () {
    const location = useLocation()
    const { name } = location.state
    const { city } = location.state
    const { col_url } = location.state
    const {total_stu} = location.state
    const [admission_stats, setAdmissionStats] = useState(false)
    console.log(name);
    console.log(city);
    console.log(col_url);
    console.log(total_stu);
    const styles = {

      displayfirst: {
        "paddingTop": "100px",
      },
      displaysecond: {
        "paddingTop": "10px",
      },
      displaythird: {
        "paddingTop": "10px",
      },
      collapsible: {
        "background-color": "#eee",
        "color": "#444",
        "cursor": "pointer",
        "padding": "18px",
        "width": "100%",
        "border": "none",
        "text-align": "left",
        "outline": "none",
        "font-size": "15px",
      },
      content: {
        "padding": "0 18px",
        "display": "none",
        "background-color": "#f1f1f1",
        "overflow": "hidden",
      },
      hide_data: {
        "display":"none",
      },
      show_data: {
        "display":"block",
      }
    }
    return (
      <div class="row">
        <p class="displayfirst" id="name" style={styles.displayfirst}>Institute Name: {name}</p>
        <p class="displaysecond" id="city">City: {city}</p>
        <p class="displaythird" id="url">College Website: <a href ={col_url}>{col_url}</a></p>
        <p class="displaythird" id="ad-url">Admission Url: <a href ={col_url + "/apply"}>{col_url + "/apply"}</a></p>
        <button type="button" class="collapsible" onClick={()=>setAdmissionStats(!admission_stats)}>Student Info</button>
        <div class="content" style={admission_stats ? styles.show_data: styles.hide_data}>
          <p>
            Total students on campus: {total_stu}
          </p>
        </div>
      </div>

    )
  }

export default Profile;
