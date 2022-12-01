import Comment from "./Comment";

// const data = [
//   {
//     commentId: 0,
//     userName: "Mahad",
//     upvotes: 5,
//     body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
//     replies: [
//       {
//         commentId: 1,
//         userName: "Raahim",
//         upvotes: 5,
//         body: "Hello How are you Mahad",
//         replies: [
//           {
//             commentId: 3,
//             userName: "Mahad",
//             upvotes: -2,
//             body: "I amd doing Okay. wbu?"
//           }
//         ]
//       },
//       {
//         commentId: 2,
//         userName: "Sirah",
//         upvotes: 5,
//         body: "Omaewa Bitch nano ka",
//         replies: [
//           {
//             commentId: 4,
//             userName: "Mahad",
//             upvotes: 0,
//             body: "Ohayo gozaimas"
//           },
//           {
//             commentId: 5,
//             userName: "Raahim",
//             upvotes: 1,
//             body: "Hi! My name is Raahim. Wanna be friends :)."
//           }
//         ]
//       }
//     ]
//   }
// ]


export default CommentSection = ({ data, level }) => {
    if (!level) level = 0;
    return (
        data.map(item =>
            <>
                <Comment key={item.commentId} userName={item.userName} body={item.body} upvotes={item.upvotes} level={level}>
                    {item.replies && item.replies.length !== 0 && <CommentSection data={item.replies} level={level} />}
                </Comment>
            </>
        )
    );
}