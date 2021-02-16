
  // const styles = StyleSheet.create({
  //   page: {
  //     flexDirection: 'row',
  //   },
  //   header_pic: {
  //     width: 15,
  //     height: 15,
  //   },
  //   header_container: {},
  //   section: {},
  //   questions: {},
  //   answer_container: {},
    
  //   h1: {
  //     fontSize: 30,
  //   },
  //   h2: {
  //     fontSize: 24,
  //   },
  //   h3: {
  //     fontSize: 22,
  //   },
  //   h4: {
  //     fontSize: 20,
  //   }
  // });

  // // *Please keep the first character of function name Upper Case
  // const CreateReference = () => (
  //   <Document>
  //     <Page size="A4" style={styles.body}>
  //       <View style={styles.header_pic}>
  //         <Image style={styles.Image} src={require("../../../assets/img/1.png")} />
  //       </View>
        
  //       <View style={styles.header_container}>
  //         <Text style={styles.h1}>
  //           Educator Reference Check Form
  //         </Text>
  //       </View>
  //       <View style={styles.section}>
  //         <Text style={styles.h3}>Educator's Name:</Text>
  //         <Text style={styles.h4}>{teacherFirstName} {teacherLastName}</Text>
  //         <Text style={styles.h3}>Field of delivery:</Text>
  //         <Text style={styles.h4}>{delField}</Text>
  //         <Text style={styles.h3}>Date of Reference:</Text>
  //         <Text style={styles.h4}>{refDate}</Text>
  //       </View>

  //       <View style={styles.sections}>
  //         <View style={styles.header_container}>
  //           <Text style={styles.h2}>
  //             Referee's Details -
  //           </Text>
  //         </View>
  //         <Text style={styles.h3}>Referee's Name:</Text>
  //         <Text style={styles.h4}>{refFirstName} {refLastName}</Text>
  //         <Text style={styles.h3}>Phone Number:</Text>
  //         <Text style={styles.h4}>{phoneArea}-{phoneNumber}</Text>
  //         <Text style={styles.h3}>Email:</Text>
  //         <Text style={styles.h4}>{email}</Text>
  //         <Text style={styles.h3}>Current place of work:</Text>
  //         <Text style={styles.h4}>{work}</Text>
  //         <Text style={styles.h3}>Current Position:</Text>
  //         <Text style={styles.h4}>{position}</Text>
  //         <Text style={styles.h3}>Professional relationship with educator:</Text>
  //         <Text style={styles.h4}>{proRelation}</Text>
  //       </View>

  //       <View style={styles.section} wrap={false}>
  //         <View style={styles.header_container}>
  //           <Text style={styles.h2}>
  //             Reference Questions -
  //           </Text>
  //         </View>
  //         <View style={styles.questions}>
  //           <Text style={styles.h3}>
  //             How long ago did you work with the educator or are you currently 
  //             supervising?
  //           </Text>
  //           <View style={styles.answer_container}>
  //             <Text style={styles.h4}>{length}</Text>
  //           </View>
  //         </View>
  //         <View style={styles.questions}>
  //           <Text style={styles.h3}>
  //             Did you directly supervise the educator?
  //           </Text>
  //           <View style={styles.answer_container}>
  //             <Text style={styles.h4}>{directly}</Text>
  //           </View>
  //         </View>
  //         <View style={styles.questions}>
  //           <Text style={styles.h3}>
  //             Please comment on the educator's professionalism and reliability:
  //           </Text>
  //           <View style={styles.answer_container}>
  //             <Text style={styles.h4}>{reliability}</Text>
  //           </View>
  //         </View>
  //         <View style={styles.questions}>
  //           <Text style={styles.h3}>
  //             Please comment on the educator's knowledge of the field:
  //           </Text>
  //           <View style={styles.answer_container}>
  //             <Text style={styles.h4}>{knowledge}</Text>
  //           </View>
  //         </View>
  //         <View style={styles.questions}>
  //           <Text style={styles.h3}>
  //             Please comment on the educator's relationships with students and 
  //             staff:
  //           </Text>
  //           <View style={styles.answer_container}>
  //             <Text style={styles.h4}>{relationship}</Text>
  //           </View>
  //         </View>
  //         <View style={styles.questions}>
  //           <Text style={styles.h3}>
  //             Are there any programs/courses that would best suit this educator's
  //             skill set/knowledge?
  //           </Text>
  //           <View style={styles.answer_container}>
  //             <Text style={styles.h4}>{courses}</Text>
  //           </View>
  //         </View>
  //         <View style={styles.questions}>
  //           <Text style={styles.h3}>
  //             Why would you recommend this educator?
  //           </Text>
  //           <View style={styles.answer_container}>
  //             <Text style={styles.h4}>{reason}</Text>
  //           </View>
  //         </View>
  //       </View>
  //     </Page>
  //   </Document>
  // );