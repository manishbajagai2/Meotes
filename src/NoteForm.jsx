import { useRef, useState } from "react"
import { Button, Col, Form, Row, Stack } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import CreatableReactSelect from "react-select/creatable"
import { v4 as uuidV4 } from "uuid"

export function NoteForm({ onSubmit, onAddTag, availableTags, title = "", markdown = "", tags = [] }) {
    const titleRef = useRef(null)
    const markdownRef = useRef(null)
    const [selectedTags, setSelectedTags] = useState(tags)
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()

        onSubmit({
            title: titleRef.current.value,
            markdown: markdownRef.current.value,
            tags: selectedTags,
        })

        navigate("..")
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Stack gap={4}>
                <Row>
                    <Col>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control ref={titleRef} required defaultValue={title} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="tags">
                            <Form.Label>Tags</Form.Label>
                            <CreatableReactSelect
                                placeholder={"Type to create or select"}
                                onCreateOption={(label) => {
                                    const newTag = { id: uuidV4(), label }
                                    onAddTag(newTag)
                                    setSelectedTags((prev) => [...prev, newTag])
                                }}
                                value={selectedTags.map((tag) => {
                                    return { label: tag.label, value: tag.id }
                                })}
                                options={availableTags.map((tag) => {
                                    return { label: tag.label, value: tag.id }
                                })}
                                onChange={(tags) => {
                                    setSelectedTags(
                                        tags.map((tag) => {
                                            return {
                                                label: tag.label,
                                                id: tag.value,
                                            }
                                        })
                                    )
                                }}
                                isMulti
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group controlId="markdown">
                    <Form.Label>Body</Form.Label>
                    <Form.Control
                        required
                        as="textarea"
                        ref={markdownRef}
                        rows={15}
                        defaultValue={markdown}
                    />
                </Form.Group>
                <Stack
                    direction="horizontal"
                    gap={2}
                    className="justify-content-end"
                >
                    <Button type="submit" variant="primary">
                        Save
                    </Button>
                    <Link to="..">
                        <Button type="button" variant="outline-secondary">
                            Cancel
                        </Button>
                    </Link>
                </Stack>
            </Stack>
        </Form>
    )
}
