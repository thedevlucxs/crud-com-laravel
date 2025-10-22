import React from "react";
import CommentSection from "./CommentSection";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";

function PostDetail({
  post,
  authUser,
  token,
  handleEditPost,
  handleCreateComment,
  handleBackToList,
  newComment,
  setNewComment,
}) {
  return (
    <Card className="w-full max-w-3xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between border-b pb-4 mb-4">
          <Button variant="outline" onClick={handleBackToList}>&larr; Voltar para todos os posts</Button>
          {token && authUser && authUser.id === post.user.id && (
            <Button variant="secondary" onClick={() => handleEditPost(post)}>Editar Post</Button>
          )}
        </CardHeader>
        <CardContent>
        <CardTitle className="mb-2 text-2xl">{post.title}</CardTitle>
        <CardDescription className="mb-4">Por: {post.user.firstName} {post.user.lastName}</CardDescription>
       <div className="prose prose-sm md:prose-base max-w-none"><p>{post.content}</p></div>
        </CardContent>
        <CardFooter className="flex-col items-start pt-6">
           <CommentSection
          comments={post.comments}
          token={token}
          handleCreateComment={handleCreateComment}
          newComment={newComment}
          setNewComment={setNewComment}
        />
        </CardFooter>
      </Card>
  );
}
export default PostDetail;
