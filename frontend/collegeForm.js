import {useState} from 'react';
import axios from 'axios';
import { getCollegeData } from './services/college_service';
import { Link } from 'react-router-dom';

const CollegeForm = () => {
    const [college_name, setCollegeName] = useState('')
    const [college_url, setCollegeURL] = useState('')
    const [college_city, setCollegeCity] = useState('')
    const [college_zip, setCollegeZIP] = useState('')
    const [college_stu_total, setCollegeStudents] = useState('')
	const [showResults, setShowResults] = useState(false)
    const HandleSubmit = (e) => {
        e.preventDefault();

        let url = "http://129.21.88.24:8080/college?name=\'"+college_name+"\'";
        const promise = axios.get(url)

        const dataPromise = promise.then((res)=>{
            console.log(res.data['results'][0]['latest']['school']['school_url'])
            var temp_url = res.data['results'][0]['latest']['school']['school_url']

            if(!temp_url.includes("http")){
              temp_url = "http://" + temp_url;
            }
			setShowResults(true);
            setCollegeURL(temp_url);
            setCollegeCity(res.data['results'][0]['latest']['school']['city'])
            setCollegeZIP(res.data['results'][0]['latest']['school']['zip'])
            setCollegeStudents(res.data['results'][0]['latest']['student']['size'])
            console.log(res.data['results'][0]['latest']['student']['size'])
        });
    }

    const styles = {
        btn: {
            "marginTop":"20px",
            "width" : "100px",
            "height": "35px",
        },
      }
    return (
        <div className="collegeform">
            <div class="container">
                <div class="row">
                    <div class="col"></div>
                    <div class="col">
                        <form onSubmit={HandleSubmit}>
                            <div class="form-group">

                                <input type="text" class="form-control anurag" value={college_name} placeholder="Enter College Name" onChange={(e)=>setCollegeName(e.target.value)} style={styles.collegeName}/>
                            </div>
                                <button type="submit" class="btn btn-primary xxx" style={styles.btn}>Search</button>
                        </form>
						<div>
						{showResults ?<Link to={'/college'} state={{name:college_name, col_url:college_url, city:college_city, total_stu:college_stu_total}}>
                            See results
                        </Link>: null}
						</div>
                    </div>
                    <div class="col">
                    </div>
            </div>
        </div>
    </div>
    );
}

export default CollegeForm;
