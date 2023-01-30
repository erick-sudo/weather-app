# Weather Forecast and Updates
*****
### Author : Erick 27th January 2023
*****
## Project Description
This project communicates with the [Weather Forecast](https://www.weatherapi.com/) API to communicate the latest weather conditons.
It also provides forecast information of a whole day with graphical visualizations of different weather aspects throught out the day.
***
Blogs about future weather forecast are made and comments are provided for.
All comemnts have an option for likes.

The Statisctics page shows the whole day's weather forecast and visually graphs each aspect within the 24hours.

****
To get the app loading blogs information, fire up the json server on port 8001.

To fetch blogs from the json-server:
```
    useEffect(() => {
    fetch('http://localhost:8001/blogs')
    .then(response => response.json())
    .then(data => setBlogs(data.reverse()))
    }, [])
```

## Technologies Used
1. HTML
2. Jquery
3. React
4. HTML
5. CSS
6. JavaScript
*****
## Contact Information
* Email : erickocheing766@.com
*****
## [License](LICENSE)
MIT License
Copyright (c) 2023 Erick. All rights reserved
