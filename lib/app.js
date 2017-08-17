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
    });    
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
  generateReportList: function(index, bahasa){
      window.radcounter = 1+ window.radcounter||1;
      let tr = `<thead class="thead-default">
            <tr>
              <th style="width: 14em;">`+radcounter+`</th>
              <th class="keyword-idx">`+index+`</th>
            </tr>
            </thead>
            <tr>
              <td class="was-validated">
               <label class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input isPass1" name="isPass1[`+index+`]" value="`+(bahasa['lang1'] || '-') +`" checked="checked" required>
                <span class="custom-control-indicator"></span>
                <span class="custom-control-description">Check pass?</span>
              </label>

              </td>
              <td>`+(bahasa['lang1'] || '-') +`</td>
            </tr>
            <tr>
              <td class="was-validated">
               <label class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input isPass2" name="isPass2[`+index+`]" value="`+(bahasa['lang2'] || '-') +`" checked="checked" required>
                <span class="custom-control-indicator"></span>
                <span class="custom-control-description">Check pass?</span>
              </label>

              </td>
              <td>`+(bahasa['lang2'] || '-') +`</td>
            </tr>`;
      return tr;

  },
  processing: function(){
    // _.each(LOCALIZER.allLang, function(item){
    //     LOCALIZER.generateReport(item);
    // });
    var asoy = _.map(LOCALIZER.allLang, function(el, idx) {
      // let tr = LOCALIZER.generateReport(idx, el)
      let tr = LOCALIZER.generateReportList(idx, el);
      return tr;
    });
    // console.log(asoy);
    $('#resultList').html(asoy);
    updateStatus();
  },
  save:function(dbName){
    if (typeof(Storage) !== "undefined") {
      // Code for localStorage/sessionStorage.
      var localData = {};
      let statusSave = false;

      // get passed lang1
      if ($('.isPass1:checked').length > 0){
        _.each($('.isPass1:checked'), function(el, idx) {
          let val = $(el).val();
          let key = $(el).attr('name');
          localData[key] = val;
        });
        statusSave = true;
      }

      // get passed lang2
      if ($('.isPass2:checked').length > 0){
        _.each($('.isPass2:checked'), function(el, idx) {
          let val = $(el).val();
          let key = $(el).attr('name');
          localData[key] = val;
        });
        statusSave = true;
      }

      if (statusSave){
        // saved to local all lang
        localStorage.setItem(dbName, JSON.stringify(localData));
        return true;     
      }else{
        return false;
      }

    } else {
        alert("Sorry! No Web Storage support..");
    }
  },
  autoCompare: function(dbName){
    window.getDataFromDB = JSON.parse(localStorage.getItem(dbName));
    // set All state to Failed
    $('.custom-control-input').prop( "checked", false );
    _.forOwn(getDataFromDB, function(value, key) { 
      // console.log("key DB:"+key);
      // console.log("value DB:"+value);
      let aktual = $('.custom-control-input[name="'+key+'"]').val();
      if (value == aktual){
        $('.custom-control-input[name="'+key+'"]').prop( "checked", true);
        // console.log("Sama antara "+value+" dengan "+aktual);
      }else{
        console.log("Tidak sama antara "+value+" dengan "+aktual);
      }
    });
    updateStatus();
  }, 
  transformIOS: function(data){
    var output = [];
    LOCALIZER.counter++;
    // console.log(data);

    // merge data:
    let dataLength = data['key'].length;
    console.log("importing "+dataLength+" key");

    for (var i = 0; i < dataLength; i++) {
      let lang = {};
      let langKey = data['key'][i]['_text'];

      lang["lang"+LOCALIZER.counter] = data['string'][i]['_text'];
      if(_.has(LOCALIZER.allLang, langKey)){
        _.merge(LOCALIZER.allLang[langKey],lang);
      }else{
        // create new
        LOCALIZER.allLang[langKey] = lang;
      }

    }
  }
};

function handleFileSelect(that, platformType) {
  // console.log("Kebaca");
  // console.log(that);

    var file = that[0].files[0]; // FileList object
    var reader = new FileReader();

        reader.onload = function(e) {
          let data = xmlToJSON.parseString(reader.result);
          
          if(platformType === 'apk'){
            // LOCALIZER.languages.push(data.resources[0].string);
            LOCALIZER.transform(data.resources[0].string); 
          }else{
            LOCALIZER.transformIOS(data.plist[0].dict[0]);
          }
          
        }
        reader.readAsText(file);  
}

function PreviewText(file) {
    $('#output').text(JSON.stringify(LOCALIZER.languages));
};

function passCounter(element){
  return $(element+':checked').length;
}

function failCounter(element){
  return $(element+':not(:checked)').length;
}

function updateStatus(){
  let countPass1 = passCounter('.isPass1');
  let countPass2 = passCounter('.isPass2');
  let countFail1 = failCounter('.isPass1');
  let countFail2 = failCounter('.isPass2');

  $('#howMany1pass').text(countPass1);
  $('#howMany2pass').text(countPass2);
  $('#howMany1fail').text(countFail1);
  $('#howMany2fail').text(countFail2);
}

function extractKey(mystring){
  var matches = mystring.match(/\[(.*?)\]/);
  if (matches) {
      return  matches[1];
  }
}

function getListDb(){
  let totalDb = localStorage.length;
  var listDb = "";
  for(var i=0, len=totalDb; i<len; i++) {
      key = localStorage.key(i);
      
      listDb += '<a class="dropdown-item dbSelected" href="#">'+key+'</a>'
  }
  return listDb;

}