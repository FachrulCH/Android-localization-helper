var LOCALIZER = {
  languages: [],
  counter: 0,
  allLang: {},
  transform: function(input){
    var output = [];
    LOCALIZER.counter++;

    _.each(input, function(item){
      let val = {};
      let lang = {};
      let stringLang = {};
      let Atribut = item._attr.name._value;  
      lang["lang"+LOCALIZER.counter] = item._text;
      
      stringLang[Atribut] = lang;
      // checking is this exist
      if(_.has(LOCALIZER.allLang, Atribut)){
        _.merge(LOCALIZER.allLang[Atribut],lang);
      }else{
        // create new
        LOCALIZER.allLang[Atribut] = lang;
      }

      // output.push(val);
    });
    
    // LOCALIZER.allLang["lang-"+LOCALIZER.counter] = output;
  },
  generateReport: function(index, bahasa){
      window.radcounter = 1+ window.radcounter||1;
      let tr = `<tr>
              <th scope="row">`+radcounter+`</th>
              <td>`+index+`</td>
              <td>`+(bahasa['lang1'] || '-') +`</td>
              <td>`+(bahasa['lang2'] || '-') +`</td>
              <td>
            <div class="was-validated">
                <label class="custom-control custom-radio">
                  <input name="radio-stacked[`+radcounter+`]" type="radio" class="custom-control-input" required>
                  <span class="custom-control-indicator"></span>
                  <span class="custom-control-description">is pass?</span>
                </label>
            </div>
              </td>
            </tr>`;
      return tr;

  },
  processing: function(){
    // _.each(LOCALIZER.allLang, function(item){
    //     LOCALIZER.generateReport(item);
    // });
    var asoy = _.map(LOCALIZER.allLang, function(el, idx) {
      let tr = LOCALIZER.generateReport(idx, el)
      return tr;
    });
    // console.log(asoy);
    $('#result').html(asoy);
  }
};

function handleFileSelect(that) {
  // console.log("Kebaca");
  // console.log(that);

    var file = that[0].files[0]; // FileList object
    var reader = new FileReader();

        reader.onload = function(e) {
          let data = xmlToJSON.parseString(reader.result);
          // LOCALIZER.languages.push(data.resources[0].string);
          LOCALIZER.transform(data.resources[0].string);
        }
        reader.readAsText(file);  
}

function PreviewText(file) {
    $('#output').text(JSON.stringify(LOCALIZER.languages));
};