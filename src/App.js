import './ca'


const App =  ()=> {

  const categories = [
    {
      id:1,
      title : "HAT"
    },
    {
      id:2,
      title : "JACKETS"
    }
    ,
    {
      id:3,
      title : "SNEAKERS"
    },
    {
      id:4,
      title : "WOMEN"
    },
    {
      id:5,
      title : "MAN"
    }
]




  return (
    <div className="categories-container">

      {categories.map((category) => {
       return  <div className="category-conatiner">
          <div className="background-image"/>
          <div className="category-body-container">
            <h2>{category.title}</h2>
            <p>Shop now</p>
          </div>
        </div>
      })}
      

    </div>
  );
}

export default App;
