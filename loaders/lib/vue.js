module.exports =  function(source) {
  // let matches = source.match(/<(.+?)>[\s\S]*?<\/\1>/gi);
  // console.log(matches[0].match(/<template>([\s\S]*?)<\/template>/i)[1])
  // return matches[1]
  console.log('-------my vue loader begin')
  console.log(source)
  console.log('-------my vue loader end')
  return source
}
