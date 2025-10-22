import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

function CreatePostForm({
  handleCreatePost,
  newPostTitle,
  setNewPostTitle,
  newPostContent,
  setNewPostContent,
}) {
  return (
    <Card className="w-full max-w-lg mx-auto">
    <form onSubmit={handleCreatePost}>
      <CardHeader>
        <CardTitle>Novo Post</CardTitle>     
        </CardHeader>
        <CardContent>
        <div className="flex flex-col space-y-1 5">
          <Label htmlFor="title">Título</Label>
          <Input id="title" value={newPostTitle} onChange={(e) => setNewPostTitle(e.target.value)} placeholder="Título do seu post" required />
        </div>
        <div className="flex flex-col space-y-1 5">
          <Label htmlFor="content">Conteúdo</Label>
          <Textarea id="content" value={newPostContent} onChange={(e) => setNewPostContent(e.target.value)} placeholder="Compartilhe suas ideias..." required />
        </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">Criar Post</Button>
        </CardFooter>
    </form>
    </Card>
  );
}

export default CreatePostForm;
